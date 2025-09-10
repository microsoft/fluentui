import * as React from 'react';

export type DialogSurfaceContextValue = boolean;

const defaultContextValue: DialogSurfaceContextValue = false;

export const DialogSurfaceContext = React.createContext<DialogSurfaceContextValue | undefined>(undefined);

export const DialogSurfaceProvider = DialogSurfaceContext.Provider;

export const useDialogSurfaceContext_unstable = (): DialogSurfaceContextValue =>
  React.useContext(DialogSurfaceContext) ?? defaultContextValue;
