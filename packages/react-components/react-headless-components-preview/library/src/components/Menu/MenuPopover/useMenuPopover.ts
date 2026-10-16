'use client';

import type * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import type { MenuPopoverProps, MenuPopoverState } from '@fluentui/react-menu';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useMenuContext } from '../menuContext';
import { useTopLayer } from '../../../hooks/useTopLayer';

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

  // Runs before `useTopLayer` shows the popover: the browser focuses the first `autofocus` item on show.
  useIsomorphicLayoutEffect(() => {
    if (open) {
      menuPopoverRef.current?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)?.setAttribute('autofocus', '');
    }
  }, [menuPopoverRef, open]);

  // The popover stays mounted; `useMenu` owns focus restore to the trigger.
  useTopLayer(menuPopoverRef as React.RefObject<HTMLElement | null>, {
    open,
    mode: 'auto',
    unmountOnClose: false,
    restoreFocus: false,
    onClose: ({ event }) =>
      setOpen(event as unknown as MouseEvent, {
        open: false,
        type: 'clickOutside',
        event: event as unknown as MouseEvent,
      }),
  });

  // Re-apply `focusgroup` after the popover is shown so the polyfill picks up the now-visible items.
  useIsomorphicLayoutEffect(() => {
    if (!open) {
      return;
    }
    const menuListEl = menuPopoverRef.current?.querySelector<HTMLElement>('[focusgroup]');
    menuListEl?.setAttribute('focusgroup', menuListEl.getAttribute('focusgroup') ?? '');
  }, [menuPopoverRef, open]);

  return state;
};
