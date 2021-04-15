import * as React from 'react';
import { FluentProviderState } from './FluentProvider.types';
import { ProviderContext } from '@fluentui/react-shared-contexts';
import { TabsterProvider } from '@fluentui/react-tabster';
import { ThemeProvider } from '@fluentui/react-theme-provider';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { dir, targetDocument, theme } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, targetDocument }), [dir, targetDocument]);

  return (
    <ThemeProvider {...state} theme={theme}>
      <ProviderContext.Provider value={value}>
        <TabsterProvider document={targetDocument} dir={dir}>
          {state.children}
        </TabsterProvider>
      </ProviderContext.Provider>
    </ThemeProvider>
  );
};
