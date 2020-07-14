import * as React from 'react';
import { Theme } from './types';
import { createDefaultTheme } from './createDefaultTheme';

export const ThemeContext = React.createContext<Theme>(createDefaultTheme());
