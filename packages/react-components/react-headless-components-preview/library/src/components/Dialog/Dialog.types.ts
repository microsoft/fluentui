import type * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  DialogContextValue,
  DialogModalType,
  DialogOpenChangeData,
  DialogSurfaceContextValue,
} from './dialogContext';

export type { DialogModalType, DialogOpenChangeData };

export type DialogOpenChangeEvent = DialogOpenChangeData['event'];

/**
 * Callback fired when the component changes value from open state.
 *
 * @param event - a React's Synthetic event
 * @param data - A data object with relevant information,
 * such as open value and type of interaction that created the event
 */
export type DialogOpenChangeEventHandler = (event: DialogOpenChangeEvent, data: DialogOpenChangeData) => void;

export type DialogContextValues = {
  dialog: DialogContextValue;
  /**
   * dialogSurface context is provided by Dialog as false
   * to ensure components inside Dialog but outside DialogSurface consume this as false
   */
  dialogSurface: DialogSurfaceContextValue;
};

export type DialogProps = {
  /**
   * Dialog variations.
   *
   * `modal`: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with.
   * The tab sequence is kept within the dialog. This is the default type of the component.
   *
   * `non-modal`: When a non-modal dialog is open, the rest of the page is not dimmed out
   * and users can interact with the rest of the page.
   *
   * `alert`: is a special type of modal dialog that interrupts the user's workflow
   * to communicate an important message or ask for a decision.
   *
   * @default modal
   */
  modalType?: DialogModalType;

  /**
   * Controls the open state of the dialog.
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
   */
  onOpenChange?: DialogOpenChangeEventHandler;

  /**
   * Can contain two children including `DialogTrigger` and `DialogSurface`.
   * Alternatively can only contain `DialogSurface` if using trigger outside dialog, or controlling state.
   */
  children: [JSXElement, JSXElement] | JSXElement;

  /**
   * Enables standard behavior according to the HTML dialog spec
   * where the focus trap involves setting outside elements inert.
   * Native `<dialog showModal()>` always uses inert focus trapping,
   * so this prop is accepted for API parity but does not change behavior.
   *
   * @default false
   */
  inertTrapFocus?: boolean;

  /**
   * Decides whether the dialog should be removed from the DOM when it is closed.
   *
   * @default true
   */
  unmountOnClose?: boolean;
};

export type DialogState = {
  open: boolean;
  modalType: DialogModalType;
  dialogTitleId: string;
  isNestedDialog: boolean;
  inertTrapFocus: boolean;
  unmountOnClose: boolean;
  trigger: React.ReactNode;
  content: React.ReactNode;
  requestOpenChange: (data: DialogOpenChangeData) => void;
};
