/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue } from '@fluentui/react-shared-contexts';
import {
  OverridesProvider_unstable as OverridesProvider,
  Provider_unstable as Provider,
  TooltipVisibilityProvider_unstable as TooltipVisibilityProvider,
  ThemeClassNameProvider_unstable as ThemeClassNameProvider,
  CustomStyleHooksProvider_unstable as CustomStyleHooksProvider,
} from '@fluentui/react-shared-contexts';
import type { FluentProviderContextValues, FluentProviderState, FluentProviderSlots } from './FluentProvider.types';
import { IconDirectionContextProvider } from '@fluentui/react-icons/lib/providers';
import { FluentProviderThemeClassNameProvider } from './FluentProviderThemeClassName';

/*
 * Griffel → Tailwind + CSS Modules migration (D20, S-G):
 *
 * `@griffel/react`'s `TextDirectionProvider` is no longer rendered here. It existed only to
 * feed Griffel's RTL style flipping; first-party CSS now flips via the rendered `dir`
 * attribute + CSS logical properties / `:dir(rtl)` (D5), and `@fluentui/react-icons` has its
 * own `IconDirectionContextProvider` (below). Consumer-authored Griffel styles no longer
 * auto-flip under FluentProvider — that is the same deliberate compat break as the umbrella
 * Griffel re-export removal (D19/S-H).
 *
 * Theming Phase 2b: the SSR-rendered theme `<style>` element, the `ThemeProvider` (JS theme
 * object context) and the `StyleNonceProvider` (CSP nonce for that style element) are all
 * gone — themes are static CSS classes applied via `themeClassName`, so the provider
 * injects no styles at all. `FluentProviderThemeClassNameProvider` propagates the resolved
 * theme class to nested providers and react-portal-compat.
 */

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider_unstable = (
  state: FluentProviderState,
  contextValues: FluentProviderContextValues,
): JSXElement => {
  assertSlots<FluentProviderSlots>(state);

  // Typescript (vscode) incorrectly references the FluentProviderProps.customStyleHooks_unstable
  // instead of FluentProviderContextValues.customStyleHooks_unstable and thinks it is
  // Partial<CustomStyleHooksContextValue>, so it needs to be cast to Required<CustomStyleHooksContextValue>

  return (
    <Provider value={contextValues.provider}>
      <ThemeClassNameProvider value={contextValues.themeClassName}>
        <FluentProviderThemeClassNameProvider value={contextValues.themeClass}>
          <CustomStyleHooksProvider
            value={contextValues.customStyleHooks_unstable as Required<CustomStyleHooksContextValue>}
          >
            <TooltipVisibilityProvider value={contextValues.tooltip}>
              <IconDirectionContextProvider value={contextValues.iconDirection}>
                <OverridesProvider value={contextValues.overrides_unstable}>
                  <state.root>{state.root.children}</state.root>
                </OverridesProvider>
              </IconDirectionContextProvider>
            </TooltipVisibilityProvider>
          </CustomStyleHooksProvider>
        </FluentProviderThemeClassNameProvider>
      </ThemeClassNameProvider>
    </Provider>
  );
};
