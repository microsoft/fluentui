import * as React from 'react';
import { FluentProviderState } from './FluentProvider.types';
import { ProviderContext, TooltipContext } from '@fluentui/react-shared-contexts';
import { ThemeProvider } from '@fluentui/react-theme-provider';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { dir, targetDocument, theme } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, targetDocument }), [dir, targetDocument]);

  return (
    <ThemeProvider {...state} theme={theme} targetDocument={state.targetDocument}>
      <ProviderContext.Provider value={value}>
        <TooltipContext.Provider value={state.tooltipContext}>{state.children}</TooltipContext.Provider>
      </ProviderContext.Provider>
    </ThemeProvider>
  );
};
