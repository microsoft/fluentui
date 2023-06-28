import * as React from 'react';

export type ToastContextValue = {
  appearance?: 'inverted';
};

const toastContextDefaultValue: ToastContextValue = {
  appearance: undefined,
};

const toastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastContextProvider = toastContext.Provider;
export const useToastContext = () => React.useContext(toastContext) ?? toastContextDefaultValue;
