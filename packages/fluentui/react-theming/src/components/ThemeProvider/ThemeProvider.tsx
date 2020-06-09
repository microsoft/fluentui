import * as React from 'react';
import { ThemeContext, useTheme } from '../../themeContext';
import { ITheme } from '../../theme.types';
import { Box } from '../Box/Box';

export interface IThemeProviderProps extends React.AllHTMLAttributes<any> {
  theme?: ITheme;
  scheme?: string;
}

export const ThemeProvider = (props: React.PropsWithChildren<IThemeProviderProps>) => {
  const currentTheme = useTheme();
  const { theme: themeFromProps, scheme, ...rest } = props;
  let theme = themeFromProps || currentTheme;

  if (!theme) {
    throw new Error('Use a ThemeProvider component to provide a theme.');
  }

  if (scheme !== undefined) {
    theme = theme.schemes[scheme] || theme;
  }

  const { direction = 'ltr' } = theme;

  return (
    <ThemeContext.Provider value={theme}>
      <Box dir={direction} {...rest} />
    </ThemeContext.Provider>
  );
};
