import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { DialogOpenChangeData, DialogModalType } from '../Dialog';
import * as React from 'react';

export type DialogContextValue = {
  /**
   * Reference to trigger element that opened the Dialog
   * null if Dialog is closed
   */
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLElement>;
  modalType: DialogModalType;
  dialogTitleID?: string;
  dialogBodyID?: string;
  open: boolean;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange: (data: DialogOpenChangeData) => void;
};

const defaultContextValue: DialogContextValue = {
  open: false,
  modalType: 'modal',
  triggerRef: { current: null },
  contentRef: { current: null },
  requestOpenChange() {
    /* noop */
  },
};

// Contexts should default to undefined
export const DialogContext: Context<DialogContextValue | undefined> = createContext<DialogContextValue | undefined>(
  undefined,
);

export const DialogProvider = DialogContext.Provider;
export const useDialogContext_unstable = <T>(selector: ContextSelector<DialogContextValue, T>): T =>
  useContextSelector(DialogContext, (ctx = defaultContextValue) => selector(ctx));
