import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { FluentProviderState } from './FluentProvider.types';
import { fluentProviderShorthandProps } from './useFluentProvider';
import { ProviderContext } from '@fluentui/react-shared-contexts';
import { FocusManagementProvider } from '@fluentui/react-focus-management';
import { ThemeProvider } from '@fluentui/react-theme-provider';

/**
 * Render the final JSX of FluentProvider
 * {@docCategory FluentProvider }
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { slots, slotProps } = getSlots(state, fluentProviderShorthandProps);
  const { dir, document, theme } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, document }), [dir, document]);

  return (
    <ProviderContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <FocusManagementProvider document={document} dir={dir}>
          <slots.root {...slotProps.root} />
        </FocusManagementProvider>
      </ThemeProvider>
    </ProviderContext.Provider>
  );
};
