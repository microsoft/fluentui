import * as React from 'react';
import { ThemeProviderState } from './ThemeProvider.types';
import { themeProviderShorthandProps } from './useThemeProvider';
import { ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';
import { getSlots } from '@fluentui/react-utilities';

export function renderThemeProvider(state: ThemeProviderState) {
  const { slots, slotProps } = getSlots(state, themeProviderShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <ThemeContext.Provider value={state.theme}>
        <ThemeClassNameContext.Provider value={state.className ?? ''}>{state.children}</ThemeClassNameContext.Provider>
      </ThemeContext.Provider>
    </slots.root>
  );
}
