import * as React from 'react';
import { ThemeProviderProps } from './ThemeProvider.types';
import { useThemeProviderClasses } from './ThemeProvider.styles';
import { useThemeProvider } from './useThemeProvider';
import { mergeStylesRenderer } from './styleRenderers/mergeStylesRenderer';
import { useThemeVariables } from './useThemeVariables';

/**
 * ThemeProvider, used for providing css variables and registering stylesheets.
 */
export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(
  (props: ThemeProviderProps, ref: React.Ref<HTMLDivElement>) => {
    const { render, state } = useThemeProvider(props, ref, {
      // The renderer default value is required to be defined, so if you're recomposing
      // this component, be sure to do so.
      renderer: mergeStylesRenderer,
    });

    // Render styles.
    useThemeProviderClasses(state, state.theme, state.renderer);

    // Render tokens as css variables.
    useThemeVariables(state);

    // Render component.
    return render(state);
  },
);

ThemeProvider.displayName = 'ThemeProvider';
