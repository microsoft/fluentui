import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { DialogOpenChangeArgs, DialogModalType } from '../Dialog';
import * as React from 'react';

export type DialogRequestOpenChangeData = {
  event: DialogOpenChangeArgs[0];
  open: React.SetStateAction<boolean>;
} & Pick<DialogOpenChangeArgs[1], 'type'>;

export type DialogContextValue = {
  triggerRef: React.Ref<HTMLElement>;
  contentRef: React.Ref<HTMLElement>;
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
