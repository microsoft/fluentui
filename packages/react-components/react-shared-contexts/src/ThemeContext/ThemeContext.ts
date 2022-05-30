import * as React from 'react';
import type { Theme } from '@fluentui/react-theme';

export type ThemeContextValue = Theme | Partial<Theme> | undefined;

const ThemeContext = React.createContext<ThemeContextValue>(undefined);

export const { Provider: ThemeProvider } = ThemeContext;

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
