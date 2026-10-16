'use client';

import * as React from 'react';
import { useMergedRefs, slot, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { PopoverSurfaceOpenContext, usePopoverContext } from '../popoverContext';
import { toDataAttributeValue } from '../../../utils';
import { useTopLayer } from '../../../hooks/useTopLayer/useTopLayer';
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
  const contextOpen = usePopoverContext(context => context.open);
  const open = React.useContext(PopoverSurfaceOpenContext) ?? contextOpen;
  const positioningCtx = usePopoverContext(context => context.positioning);
  const surfaceId = usePopoverContext(context => context.surfaceId);
  const trapFocus = usePopoverContext(context => context.trapFocus);
  const onNativeOpenChange = usePopoverContext(context => context.onNativeOpenChange);
  const onSurfaceRenderChange = usePopoverContext(context => context.onSurfaceRenderChange);

  if (process.env.NODE_ENV !== 'production' && trapFocus && props.as === 'div') {
    // eslint-disable-next-line no-console
    console.warn(
      '@fluentui/react-headless-components-preview [PopoverSurface]: ' +
        '`as="div"` is incompatible with `Popover trapFocus`. ' +
        'Use the default `dialog` element when focus trapping is enabled.',
    );
  }

  const { shouldRender, phase, popover } = useTopLayer(contentRef, {
    open,
    // A <div> cannot be shown modally; it falls back to a non-modal popover (see the warning above).
    mode: trapFocus && props.as !== 'div' ? 'modal' : 'auto',
    role: props.role ?? (trapFocus ? 'dialog' : 'group'),
    onClose: ({ event }) => onNativeOpenChange(event, false),
    onOpen: event => onNativeOpenChange(event, true),
  });

  useIsomorphicLayoutEffect(() => {
    onSurfaceRenderChange(shouldRender);
    return () => onSurfaceRenderChange(false);
  }, [shouldRender, onSurfaceRenderChange]);

  const state: PopoverSurfaceState = {
    withArrow,
    arrowRef,
    shouldRender,
    phase,
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
          popover,
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
