'use client';

import * as React from 'react';

export type DialogBackdropContextValue = boolean;

export const DialogBackdropContext = React.createContext<DialogBackdropContextValue | undefined>(undefined);

export const DialogBackdropProvider = DialogBackdropContext.Provider;

export const useDialogBackdropContext_unstable = (): DialogBackdropContextValue | undefined => {
  return React.useContext(DialogBackdropContext);
};
