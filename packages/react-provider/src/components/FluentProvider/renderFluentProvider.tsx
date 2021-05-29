import * as React from 'react';
import { FluentProviderState } from './FluentProvider.types';
import { FluentContext } from '@fluentui/react-shared-contexts';
import { getSlots } from '@fluentui/react-utilities';
import { fluentProviderShorthandProps } from './useFluentProvider';

/**
 * Render the final JSX of FluentProvider
 */
export const renderFluentProvider = (state: FluentProviderState) => {
  const { slots, slotProps } = getSlots(state, fluentProviderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <FluentContext.Provider value={state.context}>{state.children}</FluentContext.Provider>
    </slots.root>
  );
};
