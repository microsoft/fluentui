import { ThemeContextValue } from './ThemeContext.types';
import * as React from 'react';

export const ThemeContext = React.createContext({} as ThemeContextValue);

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
