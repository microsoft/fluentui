'use client';

import type * as React from 'react';
import { useMergedRefs, slot, useEventCallback } from '@fluentui/react-utilities';
import { usePopoverContext } from '../popoverContext';
import { stringifyDataAttribute } from '../../../utils';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Returns the state for a PopoverSurface component.
 *
 * The surface is rendered with `popover="auto"` so the browser owns light
 * dismiss (Escape, click-outside, popover-stack peer dismissal) — there is
 * no React-side Escape handler. Hover handlers stay because hover is an
 * open-side concern.
 */
export const usePopoverSurface = (props: PopoverSurfaceProps, ref: React.Ref<HTMLDivElement>): PopoverSurfaceState => {
  const contentRef = usePopoverContext(context => context.contentRef);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const setOpen = usePopoverContext(context => context.setOpen);
  const arrowRef = usePopoverContext(context => context.arrowRef);
  const withArrow = usePopoverContext(context => context.withArrow);
  const inline = usePopoverContext(context => context.inline);
  const open = usePopoverContext(context => context.open);
  const mountNode = usePopoverContext(context => context.mountNode);
  const positioningCtx = usePopoverContext(context => context.positioning);

  const state: PopoverSurfaceState = {
    inline,
    withArrow,
    arrowRef,
    mountNode,
    components: { root: 'div' },
    root: slot.always(
      {
        ref: useMergedRefs(ref, contentRef, positioningCtx.containerRef) as React.Ref<HTMLDivElement>,
        role: 'group',
        ...props,
        'data-popover-surface': '',
        'data-open': stringifyDataAttribute(open),
      },
      { elementType: 'div' },
    ),
    'data-open': open ? 'true' : 'false',
  };

  const { onMouseEnter: onMouseEnterOriginal, onMouseLeave: onMouseLeaveOriginal } = state.root;

  state.root.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
    onMouseEnterOriginal?.(e);
  });

  state.root.onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
    onMouseLeaveOriginal?.(e);
  });

  return state;
};
