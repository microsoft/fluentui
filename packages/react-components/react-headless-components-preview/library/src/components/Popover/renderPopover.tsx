import * as React from 'react';
import { PopoverProvider, PopoverSurfaceOpenContext } from './popoverContext';
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
    <PopoverSurfaceOpenContext.Provider value={state.open}>
      {state.shouldRenderSurface ? state.popoverSurface : null}
    </PopoverSurfaceOpenContext.Provider>
  </PopoverProvider>
);
