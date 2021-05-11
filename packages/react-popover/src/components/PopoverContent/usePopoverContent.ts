import * as React from 'react';
import { makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import { PopoverContentProps, PopoverContentShorthandProps, PopoverContentState } from './PopoverContent.types';
import { usePopoverContext } from '../../popoverContext';

const mergeProps = makeMergeProps<PopoverContentState>({ deepMerge: PopoverContentShorthandProps });

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
  const openOnContext = usePopoverContext(context => context.openOnContext);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const setOpen = usePopoverContext(context => context.setOpen);
  const mountNode = usePopoverContext(context => context.mountNode);

  const state = mergeProps(
    {
      open,
      mountNode,
      role: 'dialog',
      ref: useMergedRefs(ref, contentRef),
    },
    defaultProps,
    props,
  );

  const { onMouseEnter: onMouseEnterOriginal, onMouseLeave: onMouseLeaveOriginal } = state;
  state.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !openOnContext) {
      setOpen(e, true);
    }

    onMouseEnterOriginal?.(e);
  };

  state.onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !openOnContext) {
      setOpen(e, false);
    }

    onMouseLeaveOriginal?.(e);
  };

  return state;
};
