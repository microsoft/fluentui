import * as React from 'react';
import { ToastOptions } from '../state/types';

export type ToastContextValue = {
  close: () => void;
} & Pick<ToastOptions, 'intent'>;

const toastContextDefaultValue: ToastContextValue = {
  close: () => null,
};

const toastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastContextProvider = toastContext.Provider;
export const useToastContext = () => React.useContext(toastContext) ?? toastContextDefaultValue;
