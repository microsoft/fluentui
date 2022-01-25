import * as React from 'react';
import { TextDirectionProvider } from '@griffel/react';
import { ProviderContext, TooltipContext, ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';
import { getSlots } from '@fluentui/react-utilities';
import type { FluentProviderSlots, FluentProviderContextValues, FluentProviderState } from './FluentProvider.types';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider_unstable = (
  state: FluentProviderState,
  contextValues: FluentProviderContextValues,
) => {
  const { slots, slotProps } = getSlots<FluentProviderSlots>(state);

  return (
    <ProviderContext.Provider value={contextValues.provider}>
      <ThemeContext.Provider value={contextValues.theme}>
        <ThemeClassNameContext.Provider value={contextValues.themeClassName}>
          <TooltipContext.Provider value={contextValues.tooltip}>
            <TextDirectionProvider dir={contextValues.textDirection}>
              <slots.root {...slotProps.root}>{state.root.children}</slots.root>
            </TextDirectionProvider>
          </TooltipContext.Provider>
        </ThemeClassNameContext.Provider>
      </ThemeContext.Provider>
    </ProviderContext.Provider>
  );
};
