import * as React from 'react';
import type { Theme } from '@fluentui/theme';

export const ThemeContext = React.createContext<Theme | undefined>(undefined);
