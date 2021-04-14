import * as React from 'react';
import { ThemeProviderState } from './ThemeProvider.types';
import { themeProviderShorthandProps } from './useThemeProvider';
import { ThemeContext } from '@fluentui/react-shared-contexts';
import { getSlots } from '@fluentui/react-utilities';

export function renderThemeProvider(state: ThemeProviderState) {
  const { slots, slotProps } = getSlots(state, themeProviderShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <ThemeContext.Provider value={state.theme}>{state.children}</ThemeContext.Provider>
    </slots.root>
  );
}
