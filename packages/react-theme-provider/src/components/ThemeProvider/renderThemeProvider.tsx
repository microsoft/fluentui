import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { ThemeProviderState } from './ThemeProvider.types';
import { themeProviderShorthandProps } from './useThemeProvider';
import { ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';

/**
 * Render the final JSX of ThemeProvider
 */
export const renderThemeProvider = (state: ThemeProviderState) => {
  const { slots, slotProps } = getSlots(state, themeProviderShorthandProps);

  return (
    <ThemeContext.Provider value={state.theme}>
      <ThemeClassNameContext.Provider value={state.className || ''}>
        <slots.root {...slotProps.root}>{state.children}</slots.root>
      </ThemeClassNameContext.Provider>
    </ThemeContext.Provider>
  );
};
