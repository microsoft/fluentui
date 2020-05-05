import * as React from 'react';
import cx from 'classnames';
import { useStylesheet } from '@fluentui/react-stylesheets';
import { tokensToStyleObject } from './tokensToStyleObject';
import { ThemeContext } from './ThemeContext';
import { Theme, ThemePrepared } from './types';
import { createTheme } from './createTheme';
import { useTheme } from './useTheme';
import * as classes from './ThemeProvider.scss';

export type ThemeColorSet =
  | Partial<{
      default: string;
      hover: string;
      active: string;
      disabled: string;
    }>
  | string;

export type ThemePlateSet = Partial<{
  fill: ThemeColorSet;
  text: ThemeColorSet;
  subText: ThemeColorSet;
  link: ThemeColorSet;
  divider: ThemeColorSet;
}>;

export type TokenSetType = string | { [key: string]: TokenSetType | undefined };

export interface ThemeProviderProps extends React.AllHTMLAttributes<{}> {
  theme?: Theme;
}

export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(
  (
    { theme, style, className, ...rest }: React.PropsWithChildren<ThemeProviderProps>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    // Pull contextual theme.
    const parentTheme = useTheme();

    // Merge the theme only when parent theme or props theme mutates.
    const fullTheme = React.useMemo<ThemePrepared>(() => createTheme(parentTheme, theme), [parentTheme, theme]);

    // Generate the inline style object only when merged theme mutates.
    const inlineStyle = React.useMemo<React.CSSProperties>(
      () => tokensToStyleObject(fullTheme.tokens, undefined, { ...style }),
      [fullTheme, style],
    );

    console.log(theme, fullTheme.tokens, inlineStyle);

    // Register stylesheets as needed.
    useStylesheet(fullTheme.stylesheets);

    // Provide the theme in case it's required through context.
    return (
      <ThemeContext.Provider value={fullTheme}>
        <div {...rest} ref={ref} className={cx(className, classes.root)} style={inlineStyle} />
      </ThemeContext.Provider>
    );
  },
);

ThemeProvider.displayName = 'ThemeProvider';
