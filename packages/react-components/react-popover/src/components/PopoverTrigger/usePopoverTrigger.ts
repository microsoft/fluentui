import * as React from 'react';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  mergeCallbacks,
  useMergedRefs,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import { usePopoverContext_unstable } from '../../popoverContext';
import type { PopoverTriggerChildProps, PopoverTriggerProps, PopoverTriggerState } from './PopoverTrigger.types';
import { useARIAButtonProps } from '@fluentui/react-aria';

/**
 * Create the state required to render PopoverTrigger.
 *
 * The returned state can be modified with hooks such as usePopoverTriggerStyles,
 * before being passed to renderPopoverTrigger_unstable.
 *
 * @param props - props from this instance of PopoverTrigger
 */
export const usePopoverTrigger_unstable = (props: PopoverTriggerProps): PopoverTriggerState => {
  const { children } = props;
  const child = React.isValidElement(children)
    ? getTriggerChild<Partial<PopoverTriggerChildProps>>(children)
    : undefined;

  const open = usePopoverContext_unstable(context => context.open);
  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const openOnHover = usePopoverContext_unstable(context => context.openOnHover);
  const openOnContext = usePopoverContext_unstable(context => context.openOnContext);
  const { triggerAttributes } = useModalAttributes();

  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnContext) {
      e.preventDefault();
      setOpen(e, true);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!openOnContext) {
      toggleOpen(e);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      setOpen(e, false);
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
  };

  const triggerProps = {
    ...triggerAttributes,
    'aria-expanded': `${open}`,
    ...child?.props,
    onMouseEnter: useEventCallback(mergeCallbacks(child?.props?.onMouseEnter, onMouseEnter)),
    onMouseLeave: useEventCallback(mergeCallbacks(child?.props?.onMouseLeave, onMouseLeave)),
    onContextMenu: useEventCallback(mergeCallbacks(child?.props?.onContextMenu, onContextMenu)),
    ref: useMergedRefs(triggerRef, child?.ref),
  } as const;

  const ariaButtonTriggerProps = useARIAButtonProps(
    child?.type === 'button' || child?.type === 'a' ? child.type : 'div',
    {
      ...triggerProps,
      onClick: useEventCallback(mergeCallbacks(child?.props?.onClick, onClick)),
      onKeyDown: useEventCallback(mergeCallbacks(child?.props?.onKeyDown, onKeyDown)),
    },
  );

  return {
    children: applyTriggerPropsToChildren<PopoverTriggerChildProps>(
      props.children,
      useARIAButtonProps(
        child?.type === 'button' || child?.type === 'a' ? child.type : 'div',
        openOnContext ? triggerProps : ariaButtonTriggerProps,
      ),
    ),
  };
};
