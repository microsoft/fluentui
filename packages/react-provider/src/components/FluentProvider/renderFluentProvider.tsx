import * as React from 'react';
import { FluentProviderState } from './FluentProvider.types';
import { ProviderContext } from '@fluentui/react-shared-contexts';
import { TooltipProvider } from '@fluentui/react-tooltip';
import { TabsterProvider } from '@fluentui/react-tabster';
import { ThemeProvider } from '@fluentui/react-theme-provider';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { dir, document, theme } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, document }), [dir, document]);

  return (
    <ThemeProvider {...state} theme={theme}>
      <ProviderContext.Provider value={value}>
        <TooltipProvider>
          <TabsterProvider document={document} dir={dir}>
            {state.children}
          </TabsterProvider>
        </TooltipProvider>
      </ProviderContext.Provider>
    </ThemeProvider>
  );
};
