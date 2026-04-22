/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  Provider_unstable as Provider,
  TooltipVisibilityProvider_unstable as TooltipVisibilityProvider,
} from '@fluentui/react-shared-contexts';
import type { FluentProviderContextValues, FluentProviderSlots } from '@fluentui/react-provider';
import type { ProviderState } from './Provider.types';

/**
 * Render the final JSX of Provider
 */
export const renderProvider = (state: ProviderState, contextValues: FluentProviderContextValues): JSXElement => {
  assertSlots<FluentProviderSlots>(state);

  return (
    <Provider value={contextValues.provider}>
      <TooltipVisibilityProvider value={contextValues.tooltip}>
        <state.root />
      </TooltipVisibilityProvider>
    </Provider>
  );
};
