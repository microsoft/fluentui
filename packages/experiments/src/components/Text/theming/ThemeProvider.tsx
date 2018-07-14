import * as React from 'react';
import { ITheme } from './ITheme';
import { createTheme } from './createTheme';

const ThemeContext = React.createContext<ITheme>(createTheme());

export const ThemeConsumer = (props: { children: (theme: ITheme) => JSX.Element }) => (
  <ThemeContext.Consumer>{(theme: ITheme) => props.children(theme)}</ThemeContext.Consumer>
);

export const ThemeProvider = (props: { theme: Partial<ITheme>; children?: React.ReactNode }): JSX.Element => (
  <ThemeContext.Consumer>
    {(contextualTheme: ITheme) => (
      <ThemeContext.Provider value={createTheme(props.theme, contextualTheme)}>{props.children}</ThemeContext.Provider>
    )}
  </ThemeContext.Consumer>
);
