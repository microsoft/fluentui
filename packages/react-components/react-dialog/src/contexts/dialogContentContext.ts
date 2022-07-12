import { createContext, useContext } from 'react';

export type DialogContentContextValue = {
  isInsideDialogContent: boolean;
};

export const DialogContentContext = createContext<DialogContentContextValue>({
  isInsideDialogContent: false,
});

export const DialogContentProvider = DialogContentContext.Provider;
export const useDialogContentContext_unstable = () => useContext(DialogContentContext);
