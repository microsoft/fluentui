import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { FluentProviderState } from './FluentProvider.types';
import { fluentProviderShorthandProps } from './useFluentProvider';
import { ProviderContext, ThemeContext } from '@fluentui/react-shared-contexts';
import { FocusManagementProvider } from '@fluentui/react-focus-management';

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
      <ThemeContext.Provider value={theme}>
        <FocusManagementProvider document={document} dir={dir}>
          <slots.root {...slotProps.root} />
        </FocusManagementProvider>
      </ThemeContext.Provider>
    </ProviderContext.Provider>
  );
};
