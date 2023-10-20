import * as React from 'react';
import { applyTriggerPropsToChildren, getTriggerChild, useEventCallback } from '@fluentui/react-utilities';
import type { DialogTriggerProps, DialogTriggerState } from './DialogTrigger.types';
import { useDialogContext_unstable, useDialogSurfaceContext_unstable } from '../../contexts';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { useModalAttributes } from '@fluentui/react-tabster';

/**
 * Create the state required to render DialogTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup Dialog
 *
 * @param props - props from this instance of DialogTrigger
 */
export const useDialogTrigger_unstable = (props: DialogTriggerProps): DialogTriggerState => {
  const isInsideSurfaceDialog = useDialogSurfaceContext_unstable();

  const { children, disableButtonEnhancement = false, action = isInsideSurfaceDialog ? 'close' : 'open' } = props;

  const child = getTriggerChild(children);

  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);
  const { triggerAttributes } = useModalAttributes();

  const handleClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      child?.props.onClick?.(event);
      if (!event.isDefaultPrevented()) {
        requestOpenChange({
          event,
          type: 'triggerClick',
          open: action === 'open',
        });
      }
    },
  );

  const triggerChildProps = {
    ...child?.props,
    ref: child?.ref,
    onClick: handleClick,
    ...triggerAttributes,
  } as const;

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
