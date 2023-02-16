import { UseArrowNavigationGroupOptions } from '@fluentui/react-tabster';
import * as React from 'react';

export type KeyboardNavigationContextValue = {
  setNavigationGroupParams: (params: UseArrowNavigationGroupOptions) => void;
  defaultNavigationGroupParams: UseArrowNavigationGroupOptions;
};

const initialContextValue: KeyboardNavigationContextValue = {
  setNavigationGroupParams: () => undefined,
  defaultNavigationGroupParams: {},
};

const KeyboardNavigationContext = React.createContext<KeyboardNavigationContextValue | undefined>(undefined);

export const keyboardNavigationContextDefaultValue = {};

export const useKeyboardNavigationContext = () => React.useContext(KeyboardNavigationContext) || initialContextValue;

export const KeyboardNavigationContextProvider = KeyboardNavigationContext.Provider;
