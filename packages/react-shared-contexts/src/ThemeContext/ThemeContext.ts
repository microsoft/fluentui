import * as React from 'react';
import type { ThemeContextValue } from './ThemeContext.types';

export const ThemeContext = React.createContext((null as unknown) as ThemeContextValue);

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
