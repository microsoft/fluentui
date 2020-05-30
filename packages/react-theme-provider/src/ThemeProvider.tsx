import * as React from 'react';
import cx from 'classnames';
import { useStylesheet } from '@fluentui/react-stylesheets';
import { tokensToStyleObject } from './tokensToStyleObject';
import { ThemeContext } from './ThemeContext';
import { Theme, ThemePrepared } from './types';
import { mergeThemes } from './mergeThemes';
import { useTheme } from './useTheme';
import * as classes from './ThemeProvider.scss';

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the theme provided by the user.
   */
  theme?: Theme;
}

/**
 * ThemeProvider, used for providing css variables and registering stylesheets.
 */
export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(
  (
    { theme, style, className, ...rest }: React.PropsWithChildren<ThemeProviderProps>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    // Pull contextual theme.
    const parentTheme = useTheme();

    // Merge the theme only when parent theme or props theme mutates.
    const fullTheme = React.useMemo<ThemePrepared>(() => mergeThemes(parentTheme, theme), [parentTheme, theme]);

    // Generate the inline style object only when merged theme mutates.
    const inlineStyle = React.useMemo<React.CSSProperties>(
      () => tokensToStyleObject(fullTheme.tokens, undefined, { ...style }),
      [fullTheme, style],
    );

    const rootClass = cx(className, classes.root) || undefined;

    // Register stylesheets as needed.
    useStylesheet(fullTheme.stylesheets);

    // Provide the theme in case it's required through context.
    return (
      <ThemeContext.Provider value={fullTheme}>
        <div {...rest} ref={ref} className={rootClass} style={inlineStyle} />
      </ThemeContext.Provider>
    );
  },
);

ThemeProvider.displayName = 'ThemeProvider';
