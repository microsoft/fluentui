import * as React from 'react';
import { TooltipProviderState } from './TooltipProvider.types';
import { internal__TooltipContext } from './useTooltipContext';

/**
 * Render the final JSX of TooltipProvider
 * {@docCategory TooltipProvider}
 */
export const renderTooltipProvider = (state: TooltipProviderState) => {
  return <internal__TooltipContext.Provider value={state}>{state.children}</internal__TooltipContext.Provider>;
};
