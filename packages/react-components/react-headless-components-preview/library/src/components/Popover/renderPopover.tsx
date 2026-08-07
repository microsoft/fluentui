import * as React from 'react';
import { PopoverProvider } from './popoverContext';
import type { PopoverState, PopoverContextValue } from './Popover.types';
import { OverlaySurfaceHost } from '../../overlayRuntime';
import type { PopoverStateInternal } from './Popover.internal-types';

/**
 * Renders the Popover component by wrapping children with the PopoverContext.Provider.
 */
export const renderPopover = (
  state: PopoverState,
  contextValues: { popover: PopoverContextValue },
): React.ReactElement => {
  const { fallbackBehavior } = state as PopoverStateInternal;

  return (
    <PopoverProvider value={contextValues.popover}>
      {state.popoverTrigger}
      {state.open && state.popoverSurface ? (
        <OverlaySurfaceHost active>{state.popoverSurface}</OverlaySurfaceHost>
      ) : null}
      {fallbackBehavior}
    </PopoverProvider>
  );
};
