import * as React from 'react';
import { ProviderContext, TooltipContext, ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';
import { getSlots } from '@fluentui/react-utilities';
import type { FluentProviderSlots, FluentProviderContextValues, FluentProviderState } from './FluentProvider.types';
import { fluentProviderShorthandProps } from './useFluentProvider';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState, contextValues: FluentProviderContextValues) => {
  const { slots, slotProps } = getSlots<FluentProviderSlots>(state, fluentProviderShorthandProps);

  return (
    <ProviderContext.Provider value={contextValues.provider}>
      <ThemeContext.Provider value={contextValues.theme}>
        <ThemeClassNameContext.Provider value={contextValues.themeClassName}>
          <TooltipContext.Provider value={contextValues.tooltip}>
            <slots.root {...slotProps.root}>{state.root.children}</slots.root>
          </TooltipContext.Provider>
        </ThemeClassNameContext.Provider>
      </ThemeContext.Provider>
    </ProviderContext.Provider>
  );
};
