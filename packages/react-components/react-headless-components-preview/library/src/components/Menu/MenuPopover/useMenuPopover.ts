'use client';

import * as React from 'react';
import { useMenuPopoverBase_unstable } from '@fluentui/react-menu';
import { useMenuContext } from '../menuContext';
import type { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEvent = Event & { newState?: 'open' | 'closed' };

/**
 * Returns the state for a MenuPopover.
 *
 * Builds on v9's `useMenuPopoverBase_unstable` — which provides menu-specific
 * keyboard handlers (Escape, Tab, ArrowLeft for submenu close), mouse-over
 * throttling, and ref merging with the parent Menu's positioning ref.
 *
 * Layered on top: native `popover="auto"` to render the surface in the
 * browser top layer (so no Portal is needed). The attribute is stamped on
 * the root slot in JSX (not via `setAttribute` in an effect) to avoid the
 * FOUC where the surface briefly renders inline before being hoisted to
 * the top layer — same pattern as headless Popover after #36090.
 *
 * Nested submenus rely on the popover-stack's DOM-ancestor rule — each
 * child popover renders inside its parent popover's DOM tree, so opening a
 * deeper level does not dismiss the outer levels.
 *
 * Browser-driven `toggle` events (Escape, click-outside, popover-stack
 * dismissal) are mirrored back to Menu's `setOpen` to keep React state in
 * sync with what the browser actually shows.
 */
export const useMenuPopover = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const baseState = useMenuPopoverBase_unstable(props, ref);

  // Stamp `popover="auto"` declaratively so the surface enters the top layer
  // on first paint, avoiding FOUC. We spread into a new state object rather
  // than mutating the value returned from the base hook (React Compiler
  // forbids that). Spread preserves Symbol-keyed slot metadata.
  const state: MenuPopoverState = {
    ...baseState,
    root: { ...baseState.root, popover: 'auto' as const } as MenuPopoverState['root'],
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
        // Browser dismissed the popover (Escape, click-outside, popover-stack peer
        // dismissal). The MenuOpenChangeData union doesn't have a dedicated type for
        // browser-driven `toggle`, so reuse `clickOutside` — semantically the closest
        // match for "the user dismissed me from outside React".
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
