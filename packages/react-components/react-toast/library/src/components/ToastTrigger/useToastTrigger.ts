import * as React from 'react';
import { applyTriggerPropsToChildren, getTriggerChild, useEventCallback } from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import type { ToastTriggerProps, ToastTriggerState } from './ToastTrigger.types';
import { useToastContainerContext } from '../../contexts/toastContainerContext';

/**
 * A non-visual component that wraps its child
 * and configures them to be the trigger that will close a `Toast`.
 * This component should only accept one child.
 *
 * This component sole purpose is to avoid opting out of the internal controlled open state of a `Toast`
 * Besides being a trigger that closes a toast through context this component doesn't do much,
 * making it basically unnecessary in cases where the trigger is outside of a toast.
 */
export const useToastTrigger_unstable = (props: ToastTriggerProps): ToastTriggerState => {
  const { children, disableButtonEnhancement = false } = props;
  const { close } = useToastContainerContext();

  const child = getTriggerChild(children);

  const handleClick = useEventCallback(
    (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      child?.props.onClick?.(e);
      if (!e.isDefaultPrevented()) {
        close();
      }
    },
  );

  const triggerChildProps = {
    ...child?.props,
    ref: child?.ref,
    onClick: handleClick,
  };

  const ariaButtonTriggerChildProps = useARIAButtonProps(
    child?.type === 'button' || child?.type === 'a' ? child.type : 'div',
    {
      ...triggerChildProps,
      type: 'button',
    },
  );

  return {
    children: applyTriggerPropsToChildren(
      children,
      disableButtonEnhancement ? triggerChildProps : ariaButtonTriggerChildProps,
    ),
  };
};
