import * as React from 'react';
import { useModalAttributes } from '@fluentui/react-tabster';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { applyTriggerPropsToChildren, getTriggerChild, useEventCallback } from '@fluentui/react-utilities';
import { DialogTriggerChildProps, DialogTriggerProps, DialogTriggerState } from './DialogTrigger.types';
import { isTargetDisabled } from '../../utils';
import { useDialogContext_unstable, useDialogSurfaceContext_unstable } from '../../contexts';

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

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }
    child?.props.onClick?.(event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        type: 'triggerClick',
        open: action === 'open',
      });
    }
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }
    child?.props.onKeyDown?.(event);
    if (!event.isDefaultPrevented() && (event.key === Enter || event.key === Space)) {
      event.currentTarget.click();
    }
  });

  return {
    children: applyTriggerPropsToChildren<DialogTriggerChildProps>(children, {
      'aria-haspopup': action === 'close' ? undefined : 'dialog',
      ref: child?.ref as React.Ref<never>,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...triggerAttributes,
    }),
  };
};
