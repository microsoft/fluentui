import * as React from 'react';
import { PopoverProvider } from './popoverContext';
import type { PopoverState, PopoverContextValue } from './Popover.types';

/**
 * Renders the Popover component by wrapping children with the PopoverContext.Provider.
 */
export const renderPopover = (
  state: PopoverState,
  contextValues: { popover: PopoverContextValue },
): React.ReactElement => (
  <PopoverProvider value={contextValues.popover}>
    {state.popoverTrigger}
    {state.open ? state.popoverSurface : null}
  </PopoverProvider>
);
