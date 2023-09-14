import { createContext, useContext } from 'react';

export type DialogSurfaceContextValue = boolean;

const defaultContextValue: DialogSurfaceContextValue = false;

export const DialogSurfaceContext = createContext<DialogSurfaceContextValue | undefined>(undefined);

export const DialogSurfaceProvider = DialogSurfaceContext.Provider;

export const useDialogSurfaceContext_unstable = () => useContext(DialogSurfaceContext) ?? defaultContextValue;
