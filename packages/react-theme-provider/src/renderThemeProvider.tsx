import * as React from 'react';
import { ThemeProviderState } from './ThemeProvider.types';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { CustomizerContext, ICustomizerContext } from '@uifabric/utilities';
import { ThemeContext } from './ThemeContext';
import { Theme } from '@fluentui/theme';
import { StyleRendererContext } from './styleRenderers/useStyleRenderer';

function createCustomizerContext(theme: Theme): ICustomizerContext {
  return {
    customizations: {
      inCustomizerContext: true,
      settings: { theme },
      scopedSettings: theme.components || {},
    },
  };
}

export const renderThemeProvider = (state: ThemeProviderState) => {
  const { slots, slotProps } = getSlots(state);
  const { theme } = state;

  return (
    <ThemeContext.Provider value={theme}>
      <StyleRendererContext.Provider value={state.renderer!}>
        <CustomizerContext.Provider value={createCustomizerContext(theme)}>
          <slots.root {...slotProps.root} />
        </CustomizerContext.Provider>
      </StyleRendererContext.Provider>
    </ThemeContext.Provider>
  );
};
