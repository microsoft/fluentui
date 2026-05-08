'use client';

import type * as React from 'react';
import { useMergedRefs, slot, useEventCallback } from '@fluentui/react-utilities';
import { usePopoverContext } from '../popoverContext';
import { stringifyDataAttribute } from '../../../utils';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Returns the state for a PopoverSurface component.
 */
export const usePopoverSurface = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDialogElement>,
): PopoverSurfaceState => {
  const contentRef = usePopoverContext(context => context.contentRef);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const setOpen = usePopoverContext(context => context.setOpen);
  const arrowRef = usePopoverContext(context => context.arrowRef);
  const withArrow = usePopoverContext(context => context.withArrow);
  const open = usePopoverContext(context => context.open);
  const positioningCtx = usePopoverContext(context => context.positioning);
  const surfaceId = usePopoverContext(context => context.surfaceId);
  const trapFocus = usePopoverContext(context => context.trapFocus);

  const state: PopoverSurfaceState = {
    withArrow,
    arrowRef,
    components: { root: 'dialog' },
    root: slot.always(
      {
        ref: useMergedRefs(ref, contentRef, positioningCtx.containerRef) as React.Ref<HTMLDialogElement>,
        role: trapFocus ? undefined : 'group',
        ...props,
        id: surfaceId,
        popover: trapFocus ? undefined : 'auto',
        'data-popover-surface': '',
        'data-open': stringifyDataAttribute(open),
      },
      { elementType: 'dialog' },
    ),
    'data-open': open ? 'true' : 'false',
  };

  const { onMouseEnter: onMouseEnterOriginal, onMouseLeave: onMouseLeaveOriginal } = state.root;

  state.root.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
    onMouseEnterOriginal?.(e);
  });

  state.root.onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
    onMouseLeaveOriginal?.(e);
  });

  return state;
};
