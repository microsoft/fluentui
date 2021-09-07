import * as React from 'react';
import { ProviderContext, TooltipContext, ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';
import { getSlotsCompat } from '@fluentui/react-utilities';
import type { FluentProviderContextValues, FluentProviderState } from './FluentProvider.types';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState, contextValues: FluentProviderContextValues) => {
  const { slots, slotProps } = getSlotsCompat(state, []);

  return (
    <ProviderContext.Provider value={contextValues.provider}>
      <ThemeContext.Provider value={contextValues.theme}>
        <ThemeClassNameContext.Provider value={contextValues.themeClassName}>
          <TooltipContext.Provider value={contextValues.tooltip}>
            <slots.root {...slotProps.root}>{state.children}</slots.root>
          </TooltipContext.Provider>
        </ThemeClassNameContext.Provider>
      </ThemeContext.Provider>
    </ProviderContext.Provider>
  );
};
