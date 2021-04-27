import * as React from 'react';
import {
  makeMergeProps,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import { PopupTriggerProps, PopupTriggerState } from './PopupTrigger.types';
import { usePopupContext } from '../../popupContext';

const mergeProps = makeMergeProps<PopupTriggerState>({});

/**
 * Create the state required to render PopupTrigger.
 *
 * The returned state can be modified with hooks such as usePopupTriggerStyles,
 * before being passed to renderPopupTrigger.
 *
 * @param props - props from this instance of PopupTrigger
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePopupTrigger = (props: PopupTriggerProps, defaultProps?: PopupTriggerProps): PopupTriggerState => {
  const setOpen = usePopupContext(context => context.setOpen);
  const open = usePopupContext(context => context.open);
  const triggerRef = usePopupContext(context => context.triggerRef);
  const openOnHover = usePopupContext(context => context.openOnHover);
  const openOnContext = usePopupContext(context => context.openOnContext);

  const state = mergeProps(
    {
      children: (null as unknown) as React.ReactElement,
    },
    defaultProps,
    props,
  );

  const onContextMenu = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnContext) {
      e.preventDefault();
      setOpen(e, true);
    }
    child.props?.onContextMenu?.(e);
  });

  const onClick = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!openOnContext) {
      setOpen(e, !open);
    }
    child.props?.onClick?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();
      (e.target as HTMLElement)?.click();
    }

    child.props?.onKeyDown?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !openOnContext) {
      setOpen(e, true);
    }
    child.props?.onMouseEnter?.(e);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !openOnContext) {
      setOpen(e, false);
    }
    child.props?.onMouseEnter?.(e);
  });

  const child = React.Children.only(state.children);
  state.children = React.cloneElement(child, {
    'aria-haspopup': 'true',
    ...child.props,

    // These event handlers must handle original props
    onClick,
    onMouseEnter,
    onKeyDown,
    onMouseLeave,
    onContextMenu,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state;
};
