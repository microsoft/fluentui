import * as React from 'react';
import { PopoverProvider } from './popoverContext';
import type { PopoverState, PopoverContextValues } from './Popover.types';

/**
 * Renders the Popover component by wrapping children with the PopoverContext.Provider.
 */
export const renderPopover = (state: PopoverState, contextValues: PopoverContextValues): React.ReactElement => (
  <PopoverProvider value={contextValues.popover}>
    {state.popoverTrigger}
    {state.shouldRenderSurface ? state.popoverSurface : null}
  </PopoverProvider>
);
