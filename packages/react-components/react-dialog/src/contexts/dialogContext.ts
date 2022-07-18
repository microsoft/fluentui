import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { DialogOpenChangeData, DialogModalType } from '../Dialog';
import * as React from 'react';

export type DialogRequestOpenChangeData = Omit<DialogOpenChangeData, 'open'> & {
  open: React.SetStateAction<boolean>;
};

export type DialogContextValue = {
  /**
   * Reference to trigger element that opened the Dialog
   * null if Dialog is closed
   */
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLElement>;
  modalType: DialogModalType;
  open: boolean;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange: (data: DialogRequestOpenChangeData) => void;
};

export const DialogContext: Context<DialogContextValue> = createContext<DialogContextValue>({
  open: false,
  modalType: 'modal',
  triggerRef: { current: null },
  contentRef: { current: null },
  requestOpenChange() {
    /* noop */
  },
});

export const DialogProvider = DialogContext.Provider;
export const useDialogContext_unstable = <T>(selector: ContextSelector<DialogContextValue, T>): T =>
  useContextSelector(DialogContext, selector);
