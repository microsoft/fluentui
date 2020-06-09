import * as React from 'react';
import { ThemePrepared } from './types';
import { createDefaultTheme } from './createDefaultTheme';

export const ThemeContext = React.createContext<ThemePrepared>(createDefaultTheme());
