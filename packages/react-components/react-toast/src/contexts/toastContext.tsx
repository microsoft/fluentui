import * as React from 'react';
import { ToastIntent } from '../state/types';

export type ToastContextValue = {
  close: () => void;
  intent: ToastIntent | undefined;
  titleId: string;
  bodyId: string;
};

const toastContextDefaultValue: ToastContextValue = {
  close: () => null,
  intent: undefined,
  titleId: '',
  bodyId: '',
};

const toastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastContextProvider = toastContext.Provider;
export const useToastContext = () => React.useContext(toastContext) ?? toastContextDefaultValue;
