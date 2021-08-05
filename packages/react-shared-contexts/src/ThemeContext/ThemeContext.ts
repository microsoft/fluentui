import { ThemeContextValue } from './ThemeContext.types';
import * as React from 'react';

export const ThemeContext = React.createContext((null as unknown) as ThemeContextValue);

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
