import * as React from 'react';
import {
  makeMergeProps,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import { PopoverTriggerProps, PopoverTriggerState } from './PopoverTrigger.types';
import { usePopoverContext } from '../../popoverContext';

const mergeProps = makeMergeProps<PopoverTriggerState>({});

/**
 * Create the state required to render PopoverTrigger.
 *
 * The returned state can be modified with hooks such as usePopoverTriggerStyles,
 * before being passed to renderPopoverTrigger.
 *
 * @param props - props from this instance of PopoverTrigger
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePopoverTrigger = (
  props: PopoverTriggerProps,
  defaultProps?: PopoverTriggerProps,
): PopoverTriggerState => {
  const setOpen = usePopoverContext(context => context.setOpen);
  const open = usePopoverContext(context => context.open);
  const triggerRef = usePopoverContext(context => context.triggerRef);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const openOnContext = usePopoverContext(context => context.openOnContext);
  const { triggerAttributes } = useModalAttributes();

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
    if (shouldPreventDefaultOnKeyDown(e) && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      (e.target as HTMLElement)?.click();
    }

    if (e.key === 'Escape') {
      setOpen(e, false);
    }

    child.props?.onKeyDown?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
    child.props?.onMouseEnter?.(e);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
    child.props?.onMouseLeave?.(e);
  });

  const child = React.Children.only(state.children);
  state.children = React.cloneElement(child, {
    'aria-haspopup': 'true',
    onClick,
    onMouseEnter,
    onKeyDown,
    onMouseLeave,
    onContextMenu,
    ref: useMergedRefs(child.props.ref, triggerRef),
    ...triggerAttributes,
  });

  return state;
};
