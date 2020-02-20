import { createContext, useContext } from 'react';

import { ITheme } from './theme.types';

export const ThemeContext = createContext<ITheme | undefined>(undefined);

export const useTheme = () => useContext(ThemeContext);
