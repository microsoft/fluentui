import { useWindow } from '@fluentui/react-window-provider';
import * as React from 'react';
import { ThemeProviderState } from './ThemeProvider.types';
import { tokensToStyleObject } from './tokensToStyleObject';

export const useThemeVariables = (state: ThemeProviderState) => {
  const { theme, renderer, className } = state;
  const { tokens, rtl } = theme;

  state.className = React.useMemo<string>(
    () =>
      renderer!.renderStyles(
        {
          tokens: [tokensToStyleObject(tokens), className],
        },
        {
          rtl: !!rtl,
          // eslint-disable-next-line react-hooks/rules-of-hooks
          targetWindow: useWindow()!,
        },
      ).tokens,
    [renderer, rtl, tokens, className],
  );
};
