import * as React from 'react';
import { ThemeProviderState } from './ThemeProvider.types';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { CustomizerContext } from '@uifabric/utilities';
import { ThemeContext } from './ThemeContext';
import { StyleRendererContext } from './styleRenderers/useStyleRenderer';

export const renderThemeProvider = (state: ThemeProviderState) => {
  const { slots, slotProps } = getSlots(state);
  const { theme, customizerContext } = state;

  return (
    <ThemeContext.Provider value={theme}>
      <StyleRendererContext.Provider value={state.renderer!}>
        <CustomizerContext.Provider value={customizerContext}>
          <slots.root {...slotProps.root} />
        </CustomizerContext.Provider>
      </StyleRendererContext.Provider>
    </ThemeContext.Provider>
  );
};
