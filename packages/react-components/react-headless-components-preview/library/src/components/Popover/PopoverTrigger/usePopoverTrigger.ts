'use client';

import type * as React from 'react';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  getReactElementRef,
  mergeCallbacks,
  useMergedRefs,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Escape } from '@fluentui/keyboard-keys';
import { usePopoverContext } from '../popoverContext';
import { stringifyDataAttribute } from '../../../utils';
import type { PopoverTriggerChildProps, PopoverTriggerProps, PopoverTriggerState } from './PopoverTrigger.types';

/**
 * Returns the state for a PopoverTrigger component.
 * Applies event handlers and ARIA attributes to the child element.
 */
export const usePopoverTrigger = (props: PopoverTriggerProps): PopoverTriggerState => {
  const { children, disableButtonEnhancement = false } = props;
  const child = getTriggerChild<PopoverTriggerChildProps>(children);

  const open = usePopoverContext(context => context.open);
  const setOpen = usePopoverContext(context => context.setOpen);
  const toggleOpen = usePopoverContext(context => context.toggleOpen);
  const triggerRef = usePopoverContext(context => context.triggerRef);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const openOnContext = usePopoverContext(context => context.openOnContext);
  const positioningCtx = usePopoverContext(context => context.positioning);
  const surfaceId = usePopoverContext(context => context.surfaceId);

  const { targetDocument } = useFluent();

  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (!openOnContext || !targetDocument) {
      return;
    }

    e.preventDefault();
    const nativeEvent = e.nativeEvent;
    // Defer to trailing `pointerup` so popover="auto" light-dismiss doesn't treat it as outside-click.
    targetDocument.addEventListener('pointerup', () => setOpen(nativeEvent, true), {
      once: true,
      capture: true,
    });
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!openOnContext) {
      toggleOpen(e);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === Escape && open && !e.isDefaultPrevented()) {
      setOpen(e, false);
      e.preventDefault();
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

  const triggerChildProps = {
    'aria-expanded': `${open}` as 'true' | 'false',
    'aria-haspopup': 'true' as const,
    'aria-details': open ? surfaceId : undefined,
    'data-open': stringifyDataAttribute(open),
    ...child?.props,
    onMouseEnter: useEventCallback(mergeCallbacks(child?.props.onMouseEnter, onMouseEnter)),
    onMouseLeave: useEventCallback(mergeCallbacks(child?.props.onMouseLeave, onMouseLeave)),
    onContextMenu: useEventCallback(mergeCallbacks(child?.props.onContextMenu, onContextMenu)),
    onClick: useEventCallback(mergeCallbacks(child?.props.onClick, onClick)),
    onKeyDown: useEventCallback(mergeCallbacks(child?.props.onKeyDown, onKeyDown)),
    ref: useMergedRefs(triggerRef, positioningCtx.targetRef, getReactElementRef(child)),
  };

  const ariaButtonProps = useARIAButtonProps(
    child?.type === 'button' || child?.type === 'a' ? child.type : 'div',
    triggerChildProps,
  );

  return {
    children: applyTriggerPropsToChildren(
      children,
      openOnContext ? triggerChildProps : disableButtonEnhancement ? triggerChildProps : ariaButtonProps,
    ),
  };
};
