import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import { usePopoverContext_unstable } from '../../popoverContext';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Create the state required to render PopoverSurface.
 *
 * The returned state can be modified with hooks such as usePopoverSurfaceStyles_unstable,
 * before being passed to renderPopoverSurface_unstable.
 *
 * @param props - props from this instance of PopoverSurface
 * @param ref - reference to root HTMLDivElement of PopoverSurface
 */
export const usePopoverSurface_unstable = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDivElement>,
): PopoverSurfaceState => {
  const contentRef = usePopoverContext_unstable(context => context.contentRef);
  const openOnHover = usePopoverContext_unstable(context => context.openOnHover);
  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const mountNode = usePopoverContext_unstable(context => context.mountNode);
  const arrowRef = usePopoverContext_unstable(context => context.arrowRef);
  const size = usePopoverContext_unstable(context => context.size);
  const noArrow = usePopoverContext_unstable(context => context.noArrow);
  const appearance = usePopoverContext_unstable(context => context.appearance);
  const trapFocus = usePopoverContext_unstable(context => context.trapFocus);
  const { modalAttributes } = useModalAttributes({ trapFocus });

  const state: PopoverSurfaceState = {
    appearance,
    noArrow,
    size,
    arrowRef,
    mountNode,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, contentRef),
      role: trapFocus ? 'dialog' : 'complementary',
      'aria-modal': trapFocus ? true : undefined,
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

  return state;
};
