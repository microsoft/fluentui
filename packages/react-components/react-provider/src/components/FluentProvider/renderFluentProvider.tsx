import * as React from 'react';
import { TextDirectionProvider } from '@griffel/react';
import {
  OverridesProvider_unstable as OverridesProvider,
  Provider_unstable as Provider,
  TooltipVisibilityProvider_unstable as TooltipVisibilityProvider,
  ThemeProvider_unstable as ThemeProvider,
  ThemeClassNameProvider_unstable as ThemeClassNameProvider,
  CustomStyleHooksProvider_unstable as CustomStyleHooksProvider,
  CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue,
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

  // Typescript (vscode) incorrectly references the FluentProviderProps.customStyleHooks_unstable
  // instead of FluentProviderContextValues.customStyleHooks_unstable and thinks it is
  // Partial<CustomStyleHooksContextValue>, so it needs to be cast to Required<CustomStyleHooksContextValue>

  return (
    <Provider value={contextValues.provider}>
      <ThemeProvider value={contextValues.theme}>
        <ThemeClassNameProvider value={contextValues.themeClassName}>
          <CustomStyleHooksProvider
            value={contextValues.customStyleHooks_unstable as Required<CustomStyleHooksContextValue>}
          >
            <TooltipVisibilityProvider value={contextValues.tooltip}>
              <TextDirectionProvider dir={contextValues.textDirection}>
                <OverridesProvider value={contextValues.overrides_unstable}>
                  <slots.root {...slotProps.root}>{state.root.children}</slots.root>
                </OverridesProvider>
              </TextDirectionProvider>
            </TooltipVisibilityProvider>
          </CustomStyleHooksProvider>
        </ThemeClassNameProvider>
      </ThemeProvider>
    </Provider>
  );
};
