import * as React from 'react';
import { ToastIntent } from '../state/types';

export type ToastContextValue = {
  close: () => void;
  intent: ToastIntent | undefined;
};

const toastContextDefaultValue: ToastContextValue = {
  close: () => null,
  intent: undefined,
};

const toastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastContextProvider = toastContext.Provider;
export const useToastContext = () => React.useContext(toastContext) ?? toastContextDefaultValue;
