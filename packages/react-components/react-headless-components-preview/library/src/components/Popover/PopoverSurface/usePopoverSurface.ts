'use client';

import type * as React from 'react';
import { useMergedRefs, slot, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps } from '@fluentui/react-utilities';
import { usePopoverContext } from '../popoverContext';
import { toDataAttributeValue } from '../../../utils';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Returns the state for a PopoverSurface component.
 */
export const usePopoverSurface = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDialogElement | HTMLDivElement>,
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
  const { as, ...surfaceProps } = props as PopoverSurfaceProps & { as?: 'dialog' | 'div' };

  if (process.env.NODE_ENV !== 'production' && as !== undefined) {
    // eslint-disable-next-line no-console
    console.warn('PopoverSurface does not support `as`. Its root element is determined by Popover `trapFocus`.');
  }

  const elementType = trapFocus ? 'dialog' : 'div';

  const state: PopoverSurfaceState = {
    withArrow,
    arrowRef,
    components: { root: elementType },
    root: slot.always(
      {
        ref: useMergedRefs(ref, contentRef, positioningCtx.containerRef),
        role: trapFocus ? undefined : 'group',
        ...surfaceProps,
        id: surfaceId,
        'data-popover-surface': '',
        'data-open': toDataAttributeValue(open),
      },
      {
        defaultProps: {
          popover: trapFocus ? undefined : 'auto',
        },
        elementType,
      },
    ) as ExtractSlotProps<PopoverSurfaceState['root']>,
  };

  const onMouseEnterOriginal = state.root.onMouseEnter as React.MouseEventHandler<HTMLElement> | undefined;
  const onMouseLeaveOriginal = state.root.onMouseLeave as React.MouseEventHandler<HTMLElement> | undefined;

  state.root.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
    onMouseEnterOriginal?.(e);
  });

  state.root.onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
    onMouseLeaveOriginal?.(e);
  });

  return state;
};
