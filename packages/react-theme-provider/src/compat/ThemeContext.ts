import * as React from 'react';
import { Theme } from './types';

export const ThemeContext = React.createContext<Theme | undefined>(undefined);
