import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemePrepared } from './types';

/**
 * React hook for programatically accessing the theme.
 */
export const useTheme = (): ThemePrepared => useContext(ThemeContext);
