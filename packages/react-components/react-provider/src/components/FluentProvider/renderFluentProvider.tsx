import * as React from 'react';
import { TextDirectionProvider } from '@griffel/react';
import {
  OverridesProvider_unstable as OverridesProvider,
  Provider_unstable as Provider,
  TooltipVisibilityProvider_unstable as TooltipVisibilityProvider,
  ThemeProvider_unstable as ThemeProvider,
  ThemeClassNameProvider_unstable as ThemeClassNameProvider,
} from '@fluentui/react-shared-contexts';
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
    <Provider value={contextValues.provider}>
      <ThemeProvider value={contextValues.theme}>
        <ThemeClassNameProvider value={contextValues.themeClassName}>
          <TooltipVisibilityProvider value={contextValues.tooltip}>
            <TextDirectionProvider dir={contextValues.textDirection}>
              <OverridesProvider value={contextValues.overrides_unstable}>
                <slots.root {...slotProps.root}>{state.root.children}</slots.root>
              </OverridesProvider>
            </TextDirectionProvider>
          </TooltipVisibilityProvider>
        </ThemeClassNameProvider>
      </ThemeProvider>
    </Provider>
  );
};
