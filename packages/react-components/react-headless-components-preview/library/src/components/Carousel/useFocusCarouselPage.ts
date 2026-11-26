'use client';

import * as React from 'react';
import { useFocusFinders } from '@fluentui/react-tabster';
import { getActiveElement } from '../../hooks/top-layer/utils';

/** Prefer the slide's focus stop, then sequentially focusable content, then the group itself. */
export function useFocusCarouselPage(): (page: HTMLElement) => void {
  const { findFirstFocusable, findNextFocusable } = useFocusFinders();
  return React.useCallback(
    (page: HTMLElement) => {
      const focus = (target: HTMLElement) => {
        target.focus({ preventScroll: true });
        return getActiveElement(target) === target;
      };
      if (Array.from(page.querySelectorAll<HTMLElement>('[aria-roledescription="slide"]')).some(focus)) {
        return;
      }
      for (let target = findFirstFocusable(page); target; target = findNextFocusable(target, { container: page })) {
        if ((!target.hasAttribute('tabindex') || target.tabIndex >= 0) && focus(target)) {
          return;
        }
      }
      if (!page.hasAttribute('tabindex')) {
        page.setAttribute('tabindex', '-1');
        page.addEventListener('blur', () => page.removeAttribute('tabindex'), { once: true });
      }
      focus(page);
    },
    [findFirstFocusable, findNextFocusable],
  );
}
