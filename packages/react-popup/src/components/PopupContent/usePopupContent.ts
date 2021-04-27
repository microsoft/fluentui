import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { PopupContentProps, popupContentShorthandProps, PopupContentState } from './PopupContent.types';
import { usePopupContext } from '../../popupContext';

const mergeProps = makeMergeProps<PopupContentState>({ deepMerge: popupContentShorthandProps });

/**
 * Create the state required to render PopupContent.
 *
 * The returned state can be modified with hooks such as usePopupContentStyles,
 * before being passed to renderPopupContent.
 *
 * @param props - props from this instance of PopupContent
 * @param ref - reference to root HTMLElement of PopupContent
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePopupContent = (
  props: PopupContentProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: PopupContentProps,
): PopupContentState => {
  const contentRef = usePopupContext(context => context.contentRef);
  const open = usePopupContext(context => context.open);
  const openOnContext = usePopupContext(context => context.openOnContext);
  const openOnHover = usePopupContext(context => context.openOnHover);
  const setOpen = usePopupContext(context => context.setOpen);
  const mountNode = usePopupContext(context => context.mountNode);

  const state = mergeProps(
    {
      open: false,
      mountNode,
      ref: useMergedRefs(ref, contentRef),
    },
    defaultProps && resolveShorthandProps(defaultProps, popupContentShorthandProps),
    resolveShorthandProps(props, popupContentShorthandProps),
  );

  state.open = open || false;

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
