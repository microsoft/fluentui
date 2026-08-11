'use client';

import * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useMenuContext } from '../menuContext';
import type { MenuPopoverProps, MenuPopoverState } from '@fluentui/react-menu';
import { useOverlayRuntime } from '../../../overlayRuntime';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEvent = Event & { newState?: 'open' | 'closed' };

export const useMenuPopover = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const baseState = useMenuPopoverBase_unstable(props, ref);
  const open = useMenuContext(ctx => ctx.open);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const menuPopoverRef = useMenuContext(ctx => ctx.menuPopoverRef);
  const { targetDocument } = useFluent();
  const overlayRuntime = useOverlayRuntime(targetDocument);
  const useNativeRuntime = overlayRuntime.mode === 'ssr' || overlayRuntime.mode === 'native';

  const state: MenuPopoverState = {
    ...baseState,
    root: {
      ...baseState.root,
      popover: useNativeRuntime ? 'auto' : undefined,
      'data-overlay-runtime': useNativeRuntime ? 'native' : 'fallback',
      'data-open': open ? '' : undefined,
    } as MenuPopoverState['root'],
  };

  React.useEffect(() => {
    if (overlayRuntime.mode !== 'native') {
      return;
    }

    const surface = menuPopoverRef.current as HTMLElement | null;

    if (!surface) {
      return;
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    if (!open) {
      if (SUPPORTS_POPOVER_OPEN_SELECTOR && !surface.matches(':popover-open')) {
        return;
      }

      surface.hidePopover();
      return;
    }

    const firstFocusable = surface.querySelector<HTMLElement>(
      ':is([role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]):not([aria-disabled="true"])',
    );

    firstFocusable?.setAttribute('autofocus', '');

    if (!(SUPPORTS_POPOVER_OPEN_SELECTOR && surface.matches(':popover-open'))) {
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
  }, [menuPopoverRef, open, overlayRuntime.mode, setOpen]);

  return state;
};
