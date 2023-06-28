import * as React from 'react';
import { ToastIntent } from '../state/types';

export type ToastContainerContextValue = {
  close: () => void;
  intent: ToastIntent | undefined;
};

const toastContainerContextDefaultValue: ToastContainerContextValue = {
  close: () => null,
  intent: undefined,
};

const toastContainerContext = React.createContext<ToastContainerContextValue | undefined>(undefined);

export const ToastContainerContextProvider = toastContainerContext.Provider;
export const useToastContainerContext = () =>
  React.useContext(toastContainerContext) ?? toastContainerContextDefaultValue;
