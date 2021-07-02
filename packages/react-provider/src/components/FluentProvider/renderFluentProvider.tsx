import * as React from 'react';
import { FluentProviderState } from './FluentProvider.types';
import { ProviderContext, TooltipContext, ThemeContext, ThemeClassNameContext } from '@fluentui/react-shared-contexts';
import { getSlotsCompat } from '@fluentui/react-utilities';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { slots, slotProps } = getSlotsCompat(state, []);
  const { dir, targetDocument } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, targetDocument }), [dir, targetDocument]);

  return (
    <ProviderContext.Provider value={value}>
      <ThemeContext.Provider value={state.theme}>
        <ThemeClassNameContext.Provider value={state.className ?? ''}>
          <TooltipContext.Provider value={state.tooltipContext}>
            <slots.root {...slotProps.root}>{state.children}</slots.root>
          </TooltipContext.Provider>
        </ThemeClassNameContext.Provider>
      </ThemeContext.Provider>
    </ProviderContext.Provider>
  );
};
