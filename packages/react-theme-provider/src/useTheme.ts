import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemePrepared } from './types';

export const useTheme = (): ThemePrepared => useContext(ThemeContext);
