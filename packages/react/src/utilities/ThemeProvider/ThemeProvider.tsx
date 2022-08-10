import * as React from 'react';
import { useThemeProviderClasses } from './useThemeProviderClasses';
import { useThemeProvider } from './useThemeProvider';
import { useMergedRefs } from '@fluentui/react-hooks';
import type { ThemeProviderProps } from './ThemeProvider.types';

/**
 * ThemeProvider, used for providing css variables and registering stylesheets.
 */
export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = React.forwardRef<
  HTMLDivElement,
  ThemeProviderProps
>((props: ThemeProviderProps, ref: React.Ref<HTMLDivElement>) => {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const { render, state } = useThemeProvider(props, {
    ref: rootRef,
    as: 'div',
    applyTo: 'element',
  });

  // Render styles.
  useThemeProviderClasses(state);

  // Return the rendered content.
  return render(state);
});

ThemeProvider.displayName = 'ThemeProvider';
