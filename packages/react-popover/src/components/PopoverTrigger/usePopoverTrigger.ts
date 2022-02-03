import * as React from 'react';
import { useMergedRefs, useEventCallback, shouldPreventDefaultOnKeyDown } from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import { usePopoverContext_unstable } from '../../popoverContext';
import type { PopoverTriggerProps, PopoverTriggerState } from './PopoverTrigger.types';

/**
 * Create the state required to render PopoverTrigger.
 *
 * The returned state can be modified with hooks such as usePopoverTriggerStyles,
 * before being passed to renderPopoverTrigger_unstable.
 *
 * @param props - props from this instance of PopoverTrigger
 */
export const usePopoverTrigger_unstable = (props: PopoverTriggerProps): PopoverTriggerState => {
  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const open = usePopoverContext_unstable(context => context.open);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const openOnHover = usePopoverContext_unstable(context => context.openOnHover);
  const openOnContext = usePopoverContext_unstable(context => context.openOnContext);
  const trapFocus = usePopoverContext_unstable(context => context.trapFocus);
  const { triggerAttributes } = useModalAttributes();

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

  const child = React.Children.only(props.children);
  return {
    children: React.cloneElement(child, {
      ...triggerAttributes,
      'aria-haspopup': trapFocus ? 'dialog' : 'true',
      ...child.props,
      onClick,
      onMouseEnter,
      onKeyDown,
      onMouseLeave,
      onContextMenu,
      ref: useMergedRefs(((child as unknown) as React.ReactElement & React.RefAttributes<unknown>).ref, triggerRef),
    }),
  };
};
