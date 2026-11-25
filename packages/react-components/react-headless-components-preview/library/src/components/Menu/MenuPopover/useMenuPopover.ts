'use client';

import type * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import type { MenuPopoverProps, MenuPopoverState } from '@fluentui/react-menu';
import { useMenuContext } from '../menuContext';
import { useLayerOpenState } from '../../../hooks/top-layer';

const MENU_ITEM_SELECTOR =
  ':is([role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]):not([aria-disabled="true"])';

export const useMenuPopover = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const baseState = useMenuPopoverBase_unstable(props, ref);

  const state: MenuPopoverState = {
    ...baseState,
    root: { popover: 'auto', ...baseState.root } as MenuPopoverState['root'],
  };

  const open = useMenuContext(ctx => ctx.open);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const menuPopoverRef = useMenuContext(ctx => ctx.menuPopoverRef);

  // Stays mounted; `useMenu` restores focus. Once shown, the first enabled item takes focus and `focusgroup` is
  // re-applied, so the polyfill sees the visible items.
  useLayerOpenState(menuPopoverRef as React.RefObject<HTMLElement | null>, {
    open,
    mode: 'auto',
    onShow: element => {
      const menuListEl = element.querySelector<HTMLElement>('[focusgroup]');
      menuListEl?.setAttribute('focusgroup', menuListEl.getAttribute('focusgroup') ?? '');
      element.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)?.focus();
    },
    onOpenChange: (nextOpen, { event }) => {
      if (!nextOpen) {
        setOpen(event as unknown as MouseEvent, {
          open: false,
          type: 'clickOutside',
          event: event as unknown as MouseEvent,
        });
      }
    },
  });

  return state;
};
