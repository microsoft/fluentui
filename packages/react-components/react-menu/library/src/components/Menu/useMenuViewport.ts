'use client';

import type * as React from 'react';
import { useMenuScrollIntoView_unstable } from '@fluentui/react-utilities';

const layers = '.fui-MenuPopover, .fui-PopoverSurface, [popover]';

const getOwnedActive = (surface: HTMLElement): Element | null => {
  const root = surface.getRootNode();
  const ShadowRootConstructor = surface.ownerDocument.defaultView?.ShadowRoot;
  const active =
    (ShadowRootConstructor && root instanceof ShadowRootConstructor ? root.activeElement : null) ??
    surface.ownerDocument.activeElement;
  if (!active || !surface.contains(active) || active.closest(layers) !== surface) {
    return null;
  }
  let deep = active.shadowRoot?.activeElement;
  while (deep) {
    if (deep.closest(layers)) {
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
