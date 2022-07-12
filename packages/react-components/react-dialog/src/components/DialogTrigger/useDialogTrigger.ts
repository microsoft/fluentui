import { useModalAttributes } from '@fluentui/react-tabster';
import { applyTriggerPropsToChildren, getTriggerChild, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
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

  const child = React.isValidElement(children) ? getTriggerChild(children) : undefined;

  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);

  const { triggerAttributes } = useModalAttributes();

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    child?.props.onClick?.(event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        type: 'triggerClick',
        open: updateOpen(action),
      });
    }
  });

  return {
    children: applyTriggerPropsToChildren<DialogTriggerChildProps>(children, {
      'aria-haspopup': 'dialog',
      ref: child?.ref as React.Ref<never>,
      onClick: handleClick,
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
