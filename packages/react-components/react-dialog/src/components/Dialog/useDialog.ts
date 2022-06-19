import * as React from 'react';
import {
  getNativeElementProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import type { DialogOpenChangeArgs, DialogProps, DialogState, DialogType } from './Dialog.types';
import { DialogRequestOpenChangeData } from '../../contexts/dialogContext';
import { Escape } from '@fluentui/keyboard-keys';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog_unstable = (props: DialogProps, ref: React.Ref<HTMLElement>): DialogState => {
  const { children, overlay, type = 'modal', onOpenChange, as = 'div' } = props;

  const [trigger, content] = childrenToTriggerAndContent(children);

  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const rootShorthand = getNativeElementProps(as, {
    ...props,
    ref,
  });

  const overlayShorthand = resolveShorthand(overlay, {
    required: type !== 'non-modal',
    defaultProps: {
      'aria-hidden': 'true',
    },
  });

  const requestOpenChange = useEventCallback((data: DialogRequestOpenChangeData) => {
    const getNextOpen = normalizeSetStateAction(data.open);
    const isDefaultPrevented = normalizeDefaultPrevented(data.event);

    onOpenChange?.(
      ...([
        data.event,
        {
          type: data.type,
          open: getNextOpen(open),
        },
      ] as DialogOpenChangeArgs),
    );

    // if user prevents default then do not change state value
    if (!isDefaultPrevented()) {
      setOpen(getNextOpen);
    }
  });

  const { contentRef, triggerRef } = useFocusFirstElement({ open, type, requestOpenChange });

  const handleOverLayClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    overlayShorthand?.onClick?.(event);
    if (isOverlayClickDismiss(event, type)) {
      requestOpenChange({ event, open: false, type: 'overlayClick' });
    }
  });

  const handleRootKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    rootShorthand.onKeyDown?.(event);
    if (isEscapeKeyDismiss(event, type)) {
      requestOpenChange({ event, open: false, type: 'escapeKeyDown' });
    }
  });

  return {
    components: {
      overlay: 'div',
      root: 'div',
    },
    overlay: overlayShorthand && {
      ...overlayShorthand,
      onClick: handleOverLayClick,
    },
    root: {
      ...rootShorthand,
      onKeyDown: handleRootKeyDown,
    },
    open,
    type,
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
  if (process.env.NODE_ENV !== 'production') {
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
      return [undefined, childrenArray[1]];
    // unknown case
    default:
      return [undefined, undefined];
  }
}

/**
 * Normalizes a set state action into a setter function
 */
function normalizeSetStateAction(setOpen: React.SetStateAction<boolean>): (prev: boolean) => boolean {
  return typeof setOpen === 'function' ? setOpen : () => setOpen;
}

/**
 * normalizes defaultPrevented to work the same way between synthetic events and regular event
 */
function normalizeDefaultPrevented(event: React.SyntheticEvent | Event) {
  if (event instanceof Event) {
    return () => event.defaultPrevented;
  }
  return event.isDefaultPrevented;
}

/**
 * Checks if keydown event is a proper Escape key dismiss
 */
function isEscapeKeyDismiss(event: React.KeyboardEvent | KeyboardEvent, type: DialogType): boolean {
  const isDefaultPrevented = normalizeDefaultPrevented(event);
  return event.key === Escape && type !== 'alert' && !isDefaultPrevented();
}

/**
 * Checks is click event is a proper Overlay click dismiss
 */
function isOverlayClickDismiss(event: React.MouseEvent, type: DialogType): boolean {
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
  type,
}: Pick<DialogState, 'open' | 'requestOpenChange' | 'type'>) {
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent_unstable();
  const contentRef = React.useRef<HTMLElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const element = contentRef.current && findFirstFocusable(contentRef.current);
      if (element) {
        element.focus();
        return;
      }
      // eslint-disable-next-line no-console
      console.warn('A Dialog should have at least one focusable element inside DialogContent');

      triggerRef.current?.blur();
      const listener = (event: KeyboardEvent) => {
        if (isEscapeKeyDismiss(event, type)) {
          requestOpenChange({
            event,
            open: false,
            type: 'documentEscapeKeyDown',
          });
          triggerRef.current?.focus();
        }
      };
      targetDocument?.addEventListener('keydown', listener);
      return () => targetDocument?.removeEventListener('keydown', listener);
    }
  }, [findFirstFocusable, requestOpenChange, open, type, targetDocument]);

  return { contentRef, triggerRef };
}
