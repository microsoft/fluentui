'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useId } from '@fluentui/react-utilities';
import { DialogContext } from './dialogContext';
import type { DialogOpenChangeData, DialogProps, DialogState } from './Dialog.types';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks before being passed to renderDialog.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog = (props: DialogProps): DialogState => {
  const { children, modalType = 'modal', onOpenChange, inertTrapFocus = false, unmountOnClose = true } = props;

  const dialogTitleId = useId('dialog-title-');
  const [trigger, content] = childrenToTriggerAndContent(children);

  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  // Detect nested dialog by checking for a parent DialogContext
  const parentContext = React.useContext(DialogContext);
  const isNestedDialog = parentContext !== undefined;

  const requestOpenChange = useEventCallback((data: DialogOpenChangeData) => {
    onOpenChange?.(data.event, data);
    if (!data.event.isDefaultPrevented()) {
      setOpen(data.open);
    }
  });

  return {
    open,
    modalType,
    dialogTitleId,
    isNestedDialog,
    inertTrapFocus,
    unmountOnClose,
    trigger,
    content,
    requestOpenChange,
  };
};

/**
 * Extracts trigger and content from Dialog children.
 */
function childrenToTriggerAndContent(
  children: React.ReactNode,
): readonly [trigger: React.ReactNode, content: React.ReactNode] {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (childrenArray.length !== 1 && childrenArray.length !== 2) {
      // eslint-disable-next-line no-console
      console.warn(
        `@fluentui/react-headless-components-preview [useDialog]: ` +
          `Dialog must contain at least one child <DialogSurface/>, ` +
          `and at most two children <DialogTrigger/> <DialogSurface/> (in this order).`,
      );
    }
  }

  switch (childrenArray.length) {
    // trigger + content
    case 2:
      return childrenArray as [trigger: React.ReactNode, content: React.ReactNode];
    // content only
    case 1:
      return [undefined, childrenArray[0]];
    default:
      return [undefined, undefined];
  }
}
