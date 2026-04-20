import * as React from 'react';
import { PopoverProvider } from './popoverContext';
import type { PopoverState, PopoverContextValue } from './Popover.types';

/**
 * Renders the Popover component by wrapping children with the PopoverContext.Provider.
 * The surface portals itself via `mountNode` from context — no portal here.
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
