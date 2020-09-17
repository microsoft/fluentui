import * as React from 'react';
import { ThemeProviderProps } from './ThemeProvider.types';
import { useThemeProviderClasses } from './useThemeProviderClasses';
import { useThemeProvider } from './useThemeProvider';
import { mergeStylesRenderer } from './styleRenderers/mergeStylesRenderer';
import { useStylesheet } from '@fluentui/react-stylesheets';

/**
 * ThemeProvider, used for providing a theme, consisting of css variables and stylesheets.
 */
export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(
  (props: ThemeProviderProps, ref: React.Ref<HTMLDivElement>) => {
    const { render, state } = useThemeProvider(props, ref, {
      // The renderer default value is required to be defined, so if you're recomposing
      // this component, be sure to do so.
      renderer: mergeStylesRenderer,
    });

    // Register stylesheets as needed.
    useStylesheet(state.theme.stylesheets);

    // Render styles.
    useThemeProviderClasses(state, state.theme, state.renderer);

    // Return the rendered content.
    return render(state);
  },
);

ThemeProvider.displayName = 'ThemeProvider';
