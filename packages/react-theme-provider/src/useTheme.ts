import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Theme } from './types';

/**
 * React hook for programatically accessing the theme.
 */
export const useTheme = (): Theme => useContext(ThemeContext);
