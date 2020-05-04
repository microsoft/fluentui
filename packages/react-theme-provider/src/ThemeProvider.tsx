import * as React from 'react';
import cx from 'classnames';
import { useStylesheet } from '@fluentui/react-stylesheets';
import * as classes from './ThemeProvider.scss';
import { variablesToStyleObject } from './variablesToStyleObject';
import { ThemeContext } from './ThemeContext';
import { Theme, ThemePrepared } from './Theme';
import { createTheme } from './createTheme';
import { useTheme } from './useTheme';

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

export const ThemeProvider = React.forwardRef<HTMLDivElement>(
  (
    { theme, className, style, ...rest }: React.PropsWithChildren<ThemeProviderProps>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const parentTheme = useTheme();
    const fullTheme = React.useMemo<ThemePrepared>(() => createTheme(parentTheme, theme), [parentTheme, theme]);
    const inlineStyle = React.useMemo<React.CSSProperties>(
      () => variablesToStyleObject(fullTheme.tokens.site, undefined, { ...style }),
      [theme, style],
    );

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
