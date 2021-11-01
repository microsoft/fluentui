import * as React from 'react';
import { CustomizerContext, getNativeElementProps, omit } from '@fluentui/utilities';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderState } from './ThemeProvider.types';

export const renderThemeProvider = (state: ThemeProviderState) => {
  const { theme, customizerContext } = state;
  const Root = state.as || 'div';
  const rootProps = typeof state.as === 'string' ? getNativeElementProps(state.as, state) : omit(state, ['as']);

  return (
    <ThemeContext.Provider value={theme}>
      <CustomizerContext.Provider value={customizerContext}>
        <Root {...rootProps} />
      </CustomizerContext.Provider>
    </ThemeContext.Provider>
  );
};
