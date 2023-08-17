/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { canUseDOM, assertSlots } from '@fluentui/react-utilities';
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
import type { FluentProviderContextValues, FluentProviderState, FluentProviderSlots } from './FluentProvider.types';
import { IconDirectionContextProvider } from '@fluentui/react-icons';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider_unstable = (
  state: FluentProviderState,
  contextValues: FluentProviderContextValues,
) => {
  assertSlots<FluentProviderSlots>(state);

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
                <IconDirectionContextProvider value={contextValues.iconDirection}>
                  <OverridesProvider value={contextValues.overrides_unstable}>
                    <state.root>
                      {canUseDOM() ? null : (
                        <style
                          // Using dangerous HTML because react can escape characters
                          // which can lead to invalid CSS.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{ __html: state.serverStyleProps.cssRule }}
                          {...state.serverStyleProps.attributes}
                        />
                      )}

                      {state.root.children}
                    </state.root>
                  </OverridesProvider>
                </IconDirectionContextProvider>
              </TextDirectionProvider>
            </TooltipVisibilityProvider>
          </CustomStyleHooksProvider>
        </ThemeClassNameProvider>
      </ThemeProvider>
    </Provider>
  );
};
