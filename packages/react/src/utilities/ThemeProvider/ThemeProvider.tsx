import * as React from 'react';
import { ThemeProviderProps } from './ThemeProvider.types';
import { useThemeProviderClasses } from './useThemeProviderClasses';
import { useThemeProvider } from './useThemeProvider';
import { useFocusRects } from '@fluentui/utilities';
import { useMergedRefs } from '@fluentui/react-hooks';

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

  // Apply focus rect class on key presses.
  useFocusRects(state.ref);

  // Return the rendered content.
  return render(state);
});

ThemeProvider.displayName = 'ThemeProvider';
