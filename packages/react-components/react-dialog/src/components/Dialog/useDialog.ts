import * as React from 'react';
import { resolveShorthand, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { DialogProps, DialogState, DialogModalType, DialogOpenChangeData } from './Dialog.types';
import { DialogRequestOpenChangeData } from '../../contexts/dialogContext';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { normalizeDefaultPrevented } from '../../utils/normalizeDefaultPrevented';
import { normalizeSetStateAction } from '../../utils/normalizeSetStateAction';
import { isEscapeKeyDismiss } from '../../utils/isEscapeKeyDown';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog_unstable = (props: DialogProps): DialogState => {
  const { children, overlay, modalType = 'modal', onOpenChange } = props;

  const [trigger, content] = childrenToTriggerAndContent(children);

  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const overlayShorthand = resolveShorthand(overlay, {
    required: modalType !== 'non-modal',
    defaultProps: {
      'aria-hidden': 'true',
    },
  });

  const requestOpenChange = useEventCallback((data: DialogRequestOpenChangeData) => {
    const getNextOpen = normalizeSetStateAction(data.open);
    const isDefaultPrevented = normalizeDefaultPrevented(data.event);

    if (onOpenChange) {
      onOpenChange(data.event, {
        type: data.type,
        open: getNextOpen(open),
        event: data.event,
      } as DialogOpenChangeData);
    }

    // if user prevents default then do not change state value
    if (!isDefaultPrevented()) {
      // updates trigger reference
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = isOpening(open, getNextOpen)
        ? (data.event.currentTarget as HTMLElement)
        : null;
      // updates value
      setOpen(getNextOpen);
    }
  });

  const { contentRef, triggerRef } = useFocusFirstElement({
    open,
    modalType,
    requestOpenChange,
  });

  const handleOverLayClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    overlayShorthand?.onClick?.(event);
    if (isOverlayClickDismiss(event, modalType)) {
      requestOpenChange({ event, open: false, type: 'overlayClick' });
    }
  });

  return {
    components: {
      overlay: 'div',
    },
    overlay: overlayShorthand && {
      ...overlayShorthand,
      onClick: handleOverLayClick,
    },
    open,
    modalType,
    content,
    trigger,
    triggerRef,
    contentRef,
    requestOpenChange,
  };
};

/**
 * Extracts trigger and content from children
 */
function childrenToTriggerAndContent(
  children: React.ReactNode,
): readonly [trigger: React.ReactNode, content: React.ReactNode] {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  if (process.env.NODE_ENV === 'development') {
    if (childrenArray.length !== 1 && childrenArray.length !== 2) {
      // eslint-disable-next-line no-console
      console.warn(
        'Dialog must contain at least one child <DialogContent/>,\n' +
          'and at most two children <DialogTrigger/> <DialogContent/> (in this order)',
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
 * Checks is click event is a proper Overlay click dismiss
 */
function isOverlayClickDismiss(event: React.MouseEvent, type: DialogModalType): boolean {
  const isDefaultPrevented = normalizeDefaultPrevented(event);
  return type === 'modal' && !isDefaultPrevented();
}

/**
 * Checks if dialog is opening
 */
function isOpening(current: boolean, next: Extract<React.SetStateAction<boolean>, Function>) {
  return !current && next(current) === true;
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
    if (open) {
      const element = contentRef.current && findFirstFocusable(contentRef.current);
      if (element) {
        element.focus();
        // NOTE: if it's non-modal global listener to escape is necessary
        if (modalType !== 'non-modal') {
          return;
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('A Dialog should have at least one focusable element inside DialogContent');
        }
      }

      if (triggerRef.current && targetDocument) {
        const trigger = triggerRef.current;
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
    }
  }, [findFirstFocusable, requestOpenChange, open, modalType, targetDocument]);

  return { contentRef, triggerRef };
}
