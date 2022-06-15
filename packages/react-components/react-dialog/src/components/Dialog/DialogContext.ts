import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { DialogContextValue } from './Dialog.types';

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
