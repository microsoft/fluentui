import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { ButtonCustomStylesContextValue } from './Button.types';

export const ButtonCustomStylesContext: Context<ButtonCustomStylesContextValue> = createContext<ButtonCustomStylesContextValue>(
  {},
);

export const ButtonCustomStylesContextProvider = ButtonCustomStylesContext.Provider;
