import { Theme } from '@fluentui/react-theme';
import * as React from 'react';

export interface ThemeProviderValue extends Theme {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__ThemeContext = React.createContext<ThemeProviderValue>(({} as unknown) as Theme);

export function useTheme(): ThemeProviderValue {
  return React.useContext(internal__ThemeContext);
}
