import * as React from 'react';
import cx from 'classnames';
import { CustomizerContext, ICustomizerContext } from '@uifabric/utilities';
import { useStylesheet } from '@fluentui/react-stylesheets';
import { tokensToStyleObject } from './tokensToStyleObject';
import { ThemeContext } from './ThemeContext';
import { Theme } from './types';
import { ThemeProviderProps } from './ThemeProvider.types';
import { mergeThemes } from './mergeThemes';
import { useTheme } from './useTheme';
import * as classes from './ThemeProvider.scss';
import { getTokens } from './getTokens';

function createCustomizerContext(theme: Theme): ICustomizerContext {
  return {
    customizations: {
      inCustomizerContext: true,
      settings: { theme },
      scopedSettings: theme.components || {},
    },
  };
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
    const fullTheme = React.useMemo<Theme>(() => {
      const mergedTheme = mergeThemes<Theme>(parentTheme, theme);
      mergedTheme.tokens = getTokens(mergedTheme);
      return mergedTheme;
    }, [parentTheme, theme]);

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
        <CustomizerContext.Provider value={createCustomizerContext(fullTheme)}>
          <div {...rest} ref={ref} className={rootClass} style={inlineStyle} />
        </CustomizerContext.Provider>
      </ThemeContext.Provider>
    );
  },
);

ThemeProvider.displayName = 'ThemeProvider';
