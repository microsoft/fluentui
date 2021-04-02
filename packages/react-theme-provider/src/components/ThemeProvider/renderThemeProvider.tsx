import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { ThemeProviderState, themeProviderShorthandProps } from './ThemeProvider.types';
import { ThemeContext } from '@fluentui/react-shared-contexts';

/**
 * Render the final JSX of ThemeProvider
 */
export const renderThemeProvider = (state: ThemeProviderState) => {
  const { slots, slotProps } = getSlots(state, themeProviderShorthandProps);

  return (
    <ThemeContext.Provider value={state.theme}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </ThemeContext.Provider>
  );
};
