import * as React from 'react';
import type { Theme } from '@fluentui/react-theme';

export const ThemeContext = React.createContext<Theme | Partial<Theme> | undefined>(undefined);

export function useTheme(): Theme | Partial<Theme> | undefined {
  return React.useContext(ThemeContext);
}
