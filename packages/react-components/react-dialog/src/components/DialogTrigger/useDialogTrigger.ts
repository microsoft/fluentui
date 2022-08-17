import * as React from 'react';
import { useModalAttributes } from '@fluentui/react-tabster';
import { applyTriggerPropsToChildren, getTriggerChild, useEventCallback } from '@fluentui/react-utilities';
import { DialogTriggerChildProps, DialogTriggerProps, DialogTriggerState } from './DialogTrigger.types';
import { useDialogContext_unstable, useDialogSurfaceContext_unstable } from '../../contexts';
import { useARIAButtonProps } from '@fluentui/react-aria';

/**
 * Create the state required to render DialogTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup Dialog
 *
 * @param props - props from this instance of DialogTrigger
 */
export const useDialogTrigger_unstable = (props: DialogTriggerProps): DialogTriggerState => {
  const isInsideSurfaceDialog = useDialogSurfaceContext_unstable();

  const { children, action = isInsideSurfaceDialog ? 'close' : 'open' } = props;

  const child = React.isValidElement(children) ? getTriggerChild<DialogTriggerChildProps>(children) : undefined;

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

  return {
    children: applyTriggerPropsToChildren<DialogTriggerChildProps>(
      children,
      useARIAButtonProps(child?.type === 'button' || child?.type === 'a' ? child.type : 'div', {
        ...child?.props,
        'aria-haspopup': action === 'close' ? undefined : 'dialog',
        ref: child?.ref as React.Ref<never>,
        onClick: handleClick,
        ...triggerAttributes,
      }),
    ),
  };
};
