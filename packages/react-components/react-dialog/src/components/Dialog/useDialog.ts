import * as React from 'react';
import { useControllableState, useEventCallback, useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { useDisableBodyScroll, useFocusFirstElement } from '../../utils';
import { DialogContext } from '../../contexts';

import type { DialogOpenChangeData, DialogProps, DialogState } from './Dialog.types';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog_unstable = (props: DialogProps): DialogState => {
  const { children, modalType = 'modal', onOpenChange } = props;

  const [trigger, content] = childrenToTriggerAndContent(children);

  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const requestOpenChange = useEventCallback((data: DialogOpenChangeData) => {
    onOpenChange?.(data.event, data);

    // if user prevents default then do not change state value
    // otherwise updates state value and trigger reference to the element that caused the opening
    if (!data.event.isDefaultPrevented()) {
      setOpen(data.open);
    }
  });

  const focusRef = useFocusFirstElement(open, modalType);
  const disableBodyScroll = useDisableBodyScroll();
  const isBodyScrollLocked = Boolean(open && modalType !== 'non-modal');

  useIsomorphicLayoutEffect(() => {
    if (isBodyScrollLocked) {
      return disableBodyScroll();
    }
  }, [disableBodyScroll, isBodyScrollLocked]);

  return {
    components: {
      backdrop: 'div',
    },
    open,
    modalType,
    content: open ? content : null,
    trigger,
    requestOpenChange,
    dialogTitleId: useId('dialog-title-'),
    isNestedDialog: useHasParentContext(DialogContext),
    dialogRef: focusRef,
  };
};

/**
 * Extracts trigger and content from children
 */
function childrenToTriggerAndContent(
  children: React.ReactNode,
): readonly [trigger: React.ReactNode, content: React.ReactNode] {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  if (process.env.NODE_ENV !== 'production') {
    if (childrenArray.length !== 1 && childrenArray.length !== 2) {
      // eslint-disable-next-line no-console
      console.warn(
        'Dialog must contain at least one child <DialogSurface/>,\n' +
          'and at most two children <DialogTrigger/> <DialogSurface/> (in this order)',
      );
    }
  }
  switch (childrenArray.length) {
    // case where there's a trigger followed by content
    case 2:
      return childrenArray as [trigger: React.ReactNode, content: React.ReactNode];
    // case where there's only content
    case 1:
      return [undefined, childrenArray[0]];
    // unknown case
    default:
      return [undefined, undefined];
  }
}
