'use client';

import type * as React from 'react';
import { useMergedRefs, slot, useEventCallback } from '@fluentui/react-utilities';
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

  if (process.env.NODE_ENV !== 'production' && trapFocus && props.as === 'div') {
    // eslint-disable-next-line no-console
    console.warn(
      '@fluentui/react-headless-components-preview [PopoverSurface]: ' +
        '`as="div"` is incompatible with `Popover trapFocus`. ' +
        'Use the default `dialog` element when focus trapping is enabled.',
    );
  }

  const state: PopoverSurfaceState = {
    withArrow,
    arrowRef,
    components: { root: 'dialog' },
    root: slot.always(
      {
        ref: useMergedRefs(ref, contentRef, positioningCtx.containerRef),
        role: trapFocus ? 'dialog' : 'group',
        ...props,
        id: surfaceId,
        'data-popover-surface': '',
        'data-open': toDataAttributeValue(open),
      },
      {
        defaultProps: {
          popover: trapFocus ? undefined : 'auto',
        },
        elementType: 'dialog',
      },
    ) as PopoverSurfaceState['root'],
  };

  const { onMouseEnter: onMouseEnterOriginal, onMouseLeave: onMouseLeaveOriginal } = state.root;

  state.root.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDialogElement & HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
    onMouseEnterOriginal?.(e);
  });

  state.root.onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDialogElement & HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
    onMouseLeaveOriginal?.(e);
  });

  return state;
};
