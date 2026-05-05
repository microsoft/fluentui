'use client';

import type * as React from 'react';
import { isHTMLElement, useEventCallback } from '@fluentui/react-utilities';
import { ArrowDown, ArrowUp, Home, End } from '@fluentui/keyboard-keys';

export type ArrowNavigationOptions = {
  /**
   * CSS selector for focusable items inside the container, e.g.
   * `'[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'`.
   */
  itemSelector: string;

  /**
   * When true, ArrowDown past the last item wraps to the first, and ArrowUp
   * past the first item wraps to the last.
   * @default true
   */
  circular?: boolean;
};

/**
 * Roving-tabindex-free arrow-key navigation for `role="menu"`-style
 * containers. Handles ArrowDown / ArrowUp / Home / End and calls `.focus()`
 * on the next item; siblings keep their default tab-order so the consumer
 * does not need to manage `tabIndex` per item.
 *
 */
export const useArrowNavigation = (
  containerRef: React.RefObject<HTMLElement | null>,
  options: ArrowNavigationOptions,
): { onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void } => {
  const { itemSelector, circular = true } = options;

  const onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const { key } = event;
    if (key !== ArrowDown && key !== ArrowUp && key !== Home && key !== End) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length === 0) {
      return;
    }

    const active = container.ownerDocument.activeElement;
    const currentIndex = isHTMLElement(active) ? items.indexOf(active) : -1;

    let nextIndex: number;
    if (key === Home) {
      nextIndex = 0;
    } else if (key === End) {
      nextIndex = items.length - 1;
    } else if (key === ArrowDown) {
      nextIndex =
        currentIndex === -1
          ? 0
          : circular
          ? (currentIndex + 1) % items.length
          : Math.min(currentIndex + 1, items.length - 1);
    } else {
      // ArrowUp
      nextIndex =
        currentIndex === -1
          ? items.length - 1
          : circular
          ? (currentIndex - 1 + items.length) % items.length
          : Math.max(currentIndex - 1, 0);
    }

    items[nextIndex]?.focus();
    event.preventDefault();
  });

  return { onKeyDown };
};
