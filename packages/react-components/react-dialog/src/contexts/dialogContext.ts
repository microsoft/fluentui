import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { DialogType } from '../Dialog';
import * as React from 'react';

export type DialogRequestOpenChangeSourceType = 'escapeKeyDown' | 'overlayClick' | 'triggerClick';

export type DialogRequestOpenChangeData = {
  /**
   * The event that originated the change
   */
  event: React.SyntheticEvent;
  /**
   * The source type of the callback invocation
   */
  type: DialogRequestOpenChangeSourceType;
  /**
   * The next value for the internal state of the dialog or a function to update it
   */
  open: React.SetStateAction<boolean>;
};

export type DialogContextValue = {
  type: DialogType;
  open: boolean;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange(data: DialogRequestOpenChangeData): void;
};

export const DialogContext: Context<DialogContextValue> = createContext<DialogContextValue>({
  open: false,
  type: 'modal',
  requestOpenChange() {
    /* noop */
  },
});

export const DialogProvider = DialogContext.Provider;
export const useDialogContext_unstable = <T>(selector: ContextSelector<DialogContextValue, T>): T =>
  useContextSelector(DialogContext, selector);
