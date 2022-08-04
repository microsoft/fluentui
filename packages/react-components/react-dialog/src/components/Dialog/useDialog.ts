import * as React from 'react';
import { resolveShorthand, useControllableState, useEventCallback, useId } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { normalizeDefaultPrevented, isEscapeKeyDismiss } from '../../utils';

import type { DialogProps, DialogState, DialogModalType, DialogOpenChangeData } from './Dialog.types';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog_unstable = (props: DialogProps): DialogState => {
  const { children, backdrop, modalType = 'modal', onOpenChange } = props;

  const [trigger, content] = childrenToTriggerAndContent(children);

  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const backdropShorthand = resolveShorthand(backdrop, {
    required: modalType !== 'non-modal',
    defaultProps: {
      'aria-hidden': 'true',
    },
  });

  const requestOpenChange = useEventCallback((data: DialogOpenChangeData) => {
    const isDefaultPrevented = normalizeDefaultPrevented(data.event);

    if (onOpenChange) {
      onOpenChange(data.event, data);
    }

    // if user prevents default then do not change state value
    // otherwise updates state value and trigger reference to the element that caused the opening
    if (!isDefaultPrevented()) {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current =
        !open && data.open ? (data.event.currentTarget as HTMLElement) : null;
      setOpen(data.open);
    }
  });

  const { contentRef, triggerRef } = useFocusFirstElement({
    open,
    modalType,
    requestOpenChange,
  });

  const handlebackdropClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    backdropShorthand?.onClick?.(event);
    if (isbackdropClickDismiss(event, modalType)) {
      requestOpenChange({ event, open: false, type: 'backdropClick' });
    }
  });

  return {
    components: {
      backdrop: 'div',
    },
    backdrop: backdropShorthand && {
      ...backdropShorthand,
      onClick: handlebackdropClick,
    },
    open,
    modalType,
    content,
    trigger,
    triggerRef,
    contentRef,
    requestOpenChange,
    dialogBodyID: useId('dialog-body-'),
    dialogTitleID: useId('dialog-title-'),
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

/**
 * Checks is click event is a proper backdrop click dismiss
 */
function isbackdropClickDismiss(event: React.MouseEvent, type: DialogModalType): boolean {
  const isDefaultPrevented = normalizeDefaultPrevented(event);
  return type === 'modal' && !isDefaultPrevented();
}

/**
 * Focus first element on content when dialog is opened,
 * in case there's no focusable element, then a eventlistener is added to document
 * to ensure Escape keydown functionality
 */
function useFocusFirstElement({
  open,
  requestOpenChange,
  modalType,
}: Pick<DialogState, 'open' | 'requestOpenChange' | 'modalType'>) {
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent_unstable();
  const contentRef = React.useRef<HTMLElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const element = contentRef.current && findFirstFocusable(contentRef.current);
    if (element) {
      element.focus();
      // NOTE: if it's non-modal global listener to escape is necessary
      if (modalType !== 'non-modal') {
        return;
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('A Dialog should have at least one focusable element inside DialogSurface');
      }
    }

    if (triggerRef.current && targetDocument) {
      const trigger = triggerRef.current;
      // if the trigger is still the active element, the default behavior is to return focus to document.body,
      // which can be achived by blurring
      if (targetDocument.activeElement === trigger) {
        trigger.blur();
      }
      const listener = (event: KeyboardEvent) => {
        if (isEscapeKeyDismiss(event, modalType)) {
          requestOpenChange({
            event,
            open: false,
            type: 'documentEscapeKeyDown',
          });
          trigger.focus();
          event.stopImmediatePropagation();
        }
      };
      targetDocument.addEventListener('keydown', listener, { passive: false });
      return () => {
        targetDocument.removeEventListener('keydown', listener);
      };
    }
  }, [findFirstFocusable, requestOpenChange, open, modalType, targetDocument]);

  return { contentRef, triggerRef };
}
