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
  const { tokens, rtl } = theme;
  const targetWindow = useWindow();

  const tokenClassName = React.useMemo<string>(
    () =>
      renderer!.renderStyles(
        {
          tokens: [{ displayName: 'ThemeProvider-tokens' }, tokensToStyleObject(tokens), className],
        },
        {
          rtl,
          targetWindow,
        },
      ).tokens,
    [renderer, tokens, className, targetWindow, rtl],
  );
  state.className = (state.className || '') + ' ' + tokenClassName;
};
