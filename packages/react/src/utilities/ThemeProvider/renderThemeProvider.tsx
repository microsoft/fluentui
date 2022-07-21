import * as React from 'react';
import { CustomizerContext, FocusRectsProvider, getNativeElementProps, omit } from '@fluentui/utilities';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderState } from './ThemeProvider.types';

export const renderThemeProvider = (state: ThemeProviderState) => {
  const { customizerContext, focusRectsContext, theme } = state;
  const Root = state.as || 'div';
  const rootProps = typeof state.as === 'string' ? getNativeElementProps(state.as, state) : omit(state, ['as']);

  return (
    <ThemeContext.Provider value={theme}>
      <CustomizerContext.Provider value={customizerContext}>
        <FocusRectsProvider value={focusRectsContext}>
          <Root {...rootProps} />
        </FocusRectsProvider>
      </CustomizerContext.Provider>
    </ThemeContext.Provider>
  );
};
