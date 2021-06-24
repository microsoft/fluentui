import * as React from 'react';
import { FluentProviderState } from './FluentProvider.types';
import { ProviderContext, TooltipContext, ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { dir, targetDocument } = state;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, targetDocument }), [dir, targetDocument]);

  return (
    <ProviderContext.Provider value={value}>
      <ThemeContext.Provider value={state.theme}>
        <ThemeClassNameContext.Provider value={state.className ?? ''}>
          <TooltipContext.Provider value={state.tooltipContext}>{state.children}</TooltipContext.Provider>
        </ThemeClassNameContext.Provider>
      </ThemeContext.Provider>
    </ProviderContext.Provider>
  );
};
