import * as React from 'react';

export type ToastContextValue = {
  close: () => void;
};

const toastContextDefaultValue: ToastContextValue = {
  close: () => null,
};

const toastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastContextProvider = toastContext.Provider;
export const useToastContext = () => React.useContext(toastContext) ?? toastContextDefaultValue;
