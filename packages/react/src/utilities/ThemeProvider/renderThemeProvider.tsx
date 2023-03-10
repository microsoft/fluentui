import * as React from 'react';
import { CustomizerContext, FocusRectsProvider, getNativeElementProps, omit } from '@fluentui/utilities';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderState } from './ThemeProvider.types';

export const renderThemeProvider = (state: ThemeProviderState) => {
  const { customizerContext, ref, theme } = state;
  const Root = state.as || 'div';
  const rootProps =
    typeof state.as === 'string'
      ? getNativeElementProps(state.as, state)
      : state.as === React.Fragment
      ? { children: state.children }
      : omit(state, ['as']);

  return (
    <ThemeContext.Provider value={theme}>
      <CustomizerContext.Provider value={customizerContext}>
        <FocusRectsProvider providerRef={ref}>
          <Root {...rootProps} />
        </FocusRectsProvider>
      </CustomizerContext.Provider>
    </ThemeContext.Provider>
  );
};
