import { useModalAttributes } from '@fluentui/react-tabster';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { applyTriggerPropsToChildren, getTriggerChild, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import { isTargetDisabled } from '../../utils/isTargetDisabled';
import {
  DialogTriggerChildProps,
  DialogTriggerProps,
  DialogTriggerState,
  DialogTriggerAction,
} from './DialogTrigger.types';

/**
 * Create the state required to render DialogTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup Dialog
 *
 * @param props - props from this instance of DialogTrigger
 */
export const useDialogTrigger_unstable = (props: DialogTriggerProps): DialogTriggerState => {
  const { children, action = 'toggle' } = props;

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
        open: updateOpen(action),
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
      'aria-haspopup': 'dialog',
      ref: child?.ref as React.Ref<never>,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...triggerAttributes,
    }),
  };
};

function updateOpen(type: DialogTriggerAction): React.SetStateAction<boolean> {
  switch (type) {
    case 'close':
      return false;
    case 'open':
      return true;
    case 'toggle':
      return curr => !curr;
  }
}
