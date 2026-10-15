'use client';

import * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useMenuContext } from '../menuContext';
import type { MenuPopoverProps, MenuPopoverState } from '@fluentui/react-menu';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEvent = Event & { newState?: 'open' | 'closed' };

export const useMenuPopover = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const baseState = useMenuPopoverBase_unstable(props, ref);

  const state: MenuPopoverState = {
    ...baseState,
    root: { popover: 'auto', ...baseState.root } as MenuPopoverState['root'],
  };

  const open = useMenuContext(ctx => ctx.open);
  const disableAutoFocus = useMenuContext(ctx => ctx.disableAutoFocus ?? false);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const menuPopoverRef = useMenuContext(ctx => ctx.menuPopoverRef);
  const previousFocusState = React.useRef({ open, disableAutoFocus });

  // Hide on the accepted close commit, before the browser's default Tab navigation.
  useIsomorphicLayoutEffect(() => {
    const surface = menuPopoverRef.current;
    if (
      !open &&
      surface &&
      typeof surface.hidePopover === 'function' &&
      (!SUPPORTS_POPOVER_OPEN_SELECTOR || surface.matches(':popover-open'))
    ) {
      surface.hidePopover();
    }
  }, [menuPopoverRef, open]);

  React.useEffect(() => {
    const previous = previousFocusState.current;
    previousFocusState.current = { open, disableAutoFocus };
    const surface = menuPopoverRef.current as HTMLElement | null;

    if (!surface) {
      return;
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    if (!open) {
      return;
    }

    const firstFocusable = surface.querySelector<HTMLElement>(
      ':is([role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]):not([aria-disabled="true"])',
    );

    const ownsAutoFocus = !disableAutoFocus && !!firstFocusable && !firstFocusable.hasAttribute('autofocus');
    if (ownsAutoFocus) {
      firstFocusable.setAttribute('autofocus', '');
    }

    if (!(SUPPORTS_POPOVER_OPEN_SELECTOR && surface.matches(':popover-open'))) {
      surface.showPopover();
    }

    // Changing the attribute alone does not rerun the native popover focusing steps.
    if (!disableAutoFocus && previous.open && previous.disableAutoFocus) {
      firstFocusable?.focus();
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
    return () => {
      surface.removeEventListener('toggle', onSurfaceToggle);
      if (ownsAutoFocus) {
        firstFocusable.removeAttribute('autofocus');
      }
    };
  }, [disableAutoFocus, menuPopoverRef, open, setOpen]);

  return state;
};
