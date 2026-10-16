'use client';

import * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import { useMenuContext } from '../menuContext';
import type { MenuPopoverProps, MenuPopoverState } from '@fluentui/react-menu';
import { isPopoverOpen } from '../../../utils/topLayer';
import type { ToggleEvent } from '../../../utils/topLayer';

export const useMenuPopover = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const baseState = useMenuPopoverBase_unstable(props, ref);

  const state: MenuPopoverState = {
    ...baseState,
    root: { popover: 'auto', ...baseState.root } as MenuPopoverState['root'],
  };

  const open = useMenuContext(ctx => ctx.open);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const menuPopoverRef = useMenuContext(ctx => ctx.menuPopoverRef);

  React.useEffect(() => {
    const surface = menuPopoverRef.current as HTMLElement | null;

    if (!surface) {
      return;
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    if (!open) {
      if (!isPopoverOpen(surface)) {
        return;
      }

      surface.hidePopover();
      return;
    }

    const firstFocusable = surface.querySelector<HTMLElement>(
      ':is([role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]):not([aria-disabled="true"])',
    );

    firstFocusable?.setAttribute('autofocus', '');

    if (!isPopoverOpen(surface)) {
      surface.showPopover();
    }

    const menuListEl = surface.querySelector<HTMLElement>('[focusgroup]');

    if (menuListEl) {
      menuListEl.setAttribute('focusgroup', menuListEl.getAttribute('focusgroup') ?? '');
    }

    const onSurfaceToggle = (event: Event) => {
      const next = (event as ToggleEvent).newState;
      if (next === 'closed' && open) {
        setOpen(event as unknown as MouseEvent, {
          open: false,
          type: 'clickOutside',
          event: event as unknown as MouseEvent,
        });
      }
    };

    surface.addEventListener('toggle', onSurfaceToggle);
    return () => surface.removeEventListener('toggle', onSurfaceToggle);
  }, [menuPopoverRef, open, setOpen]);

  return state;
};
