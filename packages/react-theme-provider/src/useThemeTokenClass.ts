import { useWindow } from '@fluentui/react-window-provider';
import * as React from 'react';
import { ThemeProviderState } from './ThemeProvider.types';
import { tokensToStyleObject } from './tokensToStyleObject';

/**
 * Give the tokens defined within the theme, create a className
 * to append to the className on state. Memoizes the result to
 * avoid re-computations.
 */
export const useThemeTokenClass = (state: ThemeProviderState) => {
  const { theme, renderer, className } = state;
  const { tokens, rtl = false } = theme;
  const targetWindow = useWindow();

  state.className = React.useMemo<string>(
    () =>
      renderer!.renderStyles(
        {
          tokens: [tokensToStyleObject(tokens), className],
        },
        {
          rtl,
          targetWindow,
        },
      ).tokens,
    [renderer, rtl, tokens, targetWindow, className],
  );
};
