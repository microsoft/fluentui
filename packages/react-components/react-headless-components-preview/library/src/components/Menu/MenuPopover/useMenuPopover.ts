'use client';

import * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import { useMenuContext } from '../menuContext';
import type { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEvent = Event & { newState?: 'open' | 'closed' };

export const useMenuPopover = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const baseState = useMenuPopoverBase_unstable(props, ref);

  const state: MenuPopoverState = {
    ...baseState,
    root: { ...baseState.root, popover: 'auto' } as MenuPopoverState['root'],
  };

  const open = useMenuContext(ctx => ctx.open);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const menuPopoverRef = useMenuContext(ctx => ctx.menuPopoverRef);

  React.useEffect(() => {
    const surface = menuPopoverRef.current as HTMLElement | null;

    if (!surface || !open) {
      return;
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    if (!(SUPPORTS_POPOVER_OPEN_SELECTOR && surface.matches(':popover-open'))) {
      surface.showPopover();
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
