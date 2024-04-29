import type * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { DialogContextValue, DialogSurfaceContextValue } from '../../contexts';
import type { DialogSurfaceElement } from '../DialogSurface/DialogSurface.types';

export type DialogSlots = {};

export type DialogOpenChangeEvent = DialogOpenChangeData['event'];

export type DialogOpenChangeData =
  | {
      type: 'escapeKeyDown';
      open: boolean;
      event: React.KeyboardEvent<DialogSurfaceElement>;
    }
  | {
      type: 'backdropClick';
      open: boolean;
      event: React.MouseEvent<DialogSurfaceElement>;
    }
  | {
      type: 'triggerClick';
      open: boolean;
      event: React.MouseEvent<DialogSurfaceElement>;
    };

export type DialogModalType = 'modal' | 'non-modal' | 'alert';

/**
 * Callback fired when the component changes value from open state.
 *
 * @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown`
 * @param data - A data object with relevant information,
 * such as open value and type of interaction that created the event
 */
export type DialogOpenChangeEventHandler = (event: DialogOpenChangeEvent, data: DialogOpenChangeData) => void;

export type DialogContextValues = {
  dialog: DialogContextValue;
  /**
   * dialogSurface context is provided by Dialog as false
   * to ensure components inside Dialog but outside DialogSurface will consume this as false
   */
  dialogSurface: DialogSurfaceContextValue;
};

export type DialogProps = ComponentProps<Partial<DialogSlots>> & {
  /**
   * Dialog variations.
   *
   * `modal`: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with.
   * The tab sequence is kept within the dialog and moving the focus outside
   * the dialog will imply closing it. This is the default type of the component.
   *
   * `non-modal`: When a non-modal dialog is open, the rest of the page is not dimmed out
   * and users can interact with the rest of the page.
   * This also implies that the tab focus can move outside the dialog when it reaches the last focusable element.
   *
   * `alert`: is a special type of modal dialogs that interrupts the user's workflow
   * to communicate an important message or ask for a decision.
   * Unlike a typical modal dialog, the user must take an action through the options given to dismiss the dialog,
   * and it cannot be dismissed through the dimmed background.
   *
   * @default modal
   */
  modalType?: DialogModalType;
  /**
   * Controls the open state of the dialog
   * @default false
   */
  open?: boolean;
  /**
   * Default value for the uncontrolled open state of the dialog.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when the component changes value from open state.
   *
   * @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown`
   * @param data - A data object with relevant information,
   * such as open value and type of interaction that created the event
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onOpenChange?: DialogOpenChangeEventHandler;
  /**
   * Can contain two children including {@link DialogTrigger} and {@link DialogSurface}.
   * Alternatively can only contain {@link DialogSurface} if using trigger outside dialog, or controlling state.
   */
  children: [JSX.Element, JSX.Element] | JSX.Element;
  /**
   * Enables standard behavior according to the [HTML dialog spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
   * where the focus trap involves setting outside elements inert.
   *
   * @default false
   */
  inertTrapFocus?: boolean;
};

export type DialogState = ComponentState<DialogSlots> &
  DialogContextValue & {
    content: React.ReactNode;
    trigger: React.ReactNode;
  };
