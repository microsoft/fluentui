import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusFinders, useModalAttributes } from '@fluentui/react-tabster';
import { usePopoverContext } from '../../popoverContext';
import type { PopoverSurfaceProps, PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';

export const popoverSurfaceSlots: Array<keyof PopoverSurfaceSlots> = ['root'];

/**
 * Create the state required to render PopoverSurface.
 *
 * The returned state can be modified with hooks such as usePopoverSurfaceStyles,
 * before being passed to renderPopoverSurface.
 *
 * @param props - props from this instance of PopoverSurface
 * @param ref - reference to root HTMLDivElement of PopoverSurface
 */
export const usePopoverSurface = (props: PopoverSurfaceProps, ref: React.Ref<HTMLDivElement>): PopoverSurfaceState => {
  const contentRef = usePopoverContext(context => context.contentRef);
  const open = usePopoverContext(context => context.open);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const setOpen = usePopoverContext(context => context.setOpen);
  const mountNode = usePopoverContext(context => context.mountNode);
  const arrowRef = usePopoverContext(context => context.arrowRef);
  const size = usePopoverContext(context => context.size);
  const noArrow = usePopoverContext(context => context.noArrow);
  const brand = usePopoverContext(context => context.brand);
  const inverted = usePopoverContext(context => context.inverted);
  const trapFocus = usePopoverContext(context => context.trapFocus);
  const { modalAttributes } = useModalAttributes({ trapFocus });

  const state: PopoverSurfaceState = {
    brand,
    inverted,
    noArrow,
    size,
    arrowRef,
    open,
    mountNode,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, contentRef),
      role: 'dialog',
      ...modalAttributes,
      ...props,
    }),
  };

  const {
    onMouseEnter: onMouseEnterOriginal,
    onMouseLeave: onMouseLeaveOriginal,
    onKeyDown: onKeyDownOriginal,
  } = state.root;
  state.root.onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }

    onMouseEnterOriginal?.(e);
  };

  state.root.onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }

    onMouseLeaveOriginal?.(e);
  };

  state.root.onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // only close if the event happened inside the current popover
    // If using a stack of inline popovers, the user should call `stopPropagation` to avoid dismissing the entire stack
    if (e.key === 'Escape' && contentRef.current?.contains(e.target as HTMLDivElement)) {
      setOpen(e, false);
    }

    onKeyDownOriginal?.(e);
  };

  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (state.open && contentRef.current) {
      const firstFocusable = findFirstFocusable(contentRef.current);
      firstFocusable?.focus();
    }
  }, [contentRef, findFirstFocusable, state.open]);
  return state;
};
