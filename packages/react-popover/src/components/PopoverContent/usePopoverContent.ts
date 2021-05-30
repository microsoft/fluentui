import * as React from 'react';
import { makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusFinders, useModalAttributes } from '@fluentui/react-tabster';
import { PopoverContentProps, PopoverContentState } from './PopoverContent.types';
import { usePopoverContext } from '../../popoverContext';

const mergeProps = makeMergeProps<PopoverContentState>({});

/**
 * Create the state required to render PopoverContent.
 *
 * The returned state can be modified with hooks such as usePopoverContentStyles,
 * before being passed to renderPopoverContent.
 *
 * @param props - props from this instance of PopoverContent
 * @param ref - reference to root HTMLElement of PopoverContent
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePopoverContent = (
  props: PopoverContentProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: PopoverContentProps,
): PopoverContentState => {
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

  const state = mergeProps(
    {
      brand,
      inverted,
      noArrow,
      size,
      arrowRef,
      open,
      mountNode,
      role: 'dialog',
      ref: useMergedRefs(ref, contentRef),
      ...modalAttributes,
    },
    defaultProps,
    props,
  );

  const {
    onMouseEnter: onMouseEnterOriginal,
    onMouseLeave: onMouseLeaveOriginal,
    onKeyDown: onKeyDownOriginal,
  } = state;
  state.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }

    onMouseEnterOriginal?.(e);
  };

  state.onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }

    onMouseLeaveOriginal?.(e);
  };

  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // only close if the event happened inside the current popover
    // If using a stack of inline popovers, the user should call `stopPropagation` to avoid dismissing the entire stack
    if (e.key === 'Escape' && contentRef.current?.contains(e.target as HTMLElement)) {
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
