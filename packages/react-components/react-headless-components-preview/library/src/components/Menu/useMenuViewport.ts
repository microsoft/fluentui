'use client';

import type * as React from 'react';
import { useMenuScrollIntoView_unstable } from '@fluentui/react-utilities';
import { getActiveElement } from '../../hooks/top-layer/utils';

const getOwnedActive = (surface: HTMLElement): Element | null => {
  const active = getActiveElement(surface);
  if (!active || !surface.contains(active) || active.closest('[popover]') !== surface) {
    return null;
  }
  let deep = active.shadowRoot?.activeElement;
  while (deep) {
    if (deep.closest('[popover]')) {
      return null;
    }
    deep = deep.shadowRoot?.activeElement;
  }
  return active;
};

export const useMenuViewport = (
  open: boolean,
  triggerRef: React.RefObject<HTMLElement | null>,
  parentRef: React.RefObject<HTMLElement | null>,
): React.RefCallback<HTMLElement> => useMenuScrollIntoView_unstable(open, triggerRef, parentRef, getOwnedActive);
