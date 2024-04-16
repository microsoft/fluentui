import * as React from 'react';
import type { Theme } from '@fluentui/react-theme';

export type ThemeContextValue = Theme | Partial<Theme> | undefined;

/**
 * @internal
 */
export const ThemeContext = React.createContext<ThemeContextValue>(undefined);

/**
 * @internal
 */
export const ThemeProvider = ThemeContext.Provider;
