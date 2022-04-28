import * as React from 'react';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  shouldPreventDefaultOnKeyDown,
  useMergedRefs,
  useMergedEventCallbacks,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import { usePopoverContext_unstable } from '../../popoverContext';
import type { PopoverTriggerChildProps, PopoverTriggerProps, PopoverTriggerState } from './PopoverTrigger.types';

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
  const child = React.isValidElement(children) ? getTriggerChild(children) : undefined;

  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const openOnHover = usePopoverContext_unstable(context => context.openOnHover);
  const openOnContext = usePopoverContext_unstable(context => context.openOnContext);
  const trapFocus = usePopoverContext_unstable(context => context.trapFocus);
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
    if (shouldPreventDefaultOnKeyDown(e) && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      (e.target as HTMLElement)?.click();
    }

    if (e.key === 'Escape') {
      setOpen(e, false);
    }
  };

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
  });

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
  };

  return {
    children: applyTriggerPropsToChildren<PopoverTriggerChildProps>(props.children, {
      ...triggerAttributes,
      'aria-haspopup': trapFocus ? 'dialog' : 'true',
      ...child?.props,
      onClick: useMergedEventCallbacks(child?.props?.onClick, onClick),
      onMouseEnter: useMergedEventCallbacks(child?.props?.onMouseEnter, onMouseEnter),
      onKeyDown: useMergedEventCallbacks(child?.props?.onKeyDown, onKeyDown),
      onMouseLeave: useMergedEventCallbacks(child?.props?.onMouseLeave, onMouseLeave),
      onContextMenu: useMergedEventCallbacks(child?.props?.onContextMenu, onContextMenu),
      ref: useMergedRefs(triggerRef, child?.ref),
    }),
  };
};
