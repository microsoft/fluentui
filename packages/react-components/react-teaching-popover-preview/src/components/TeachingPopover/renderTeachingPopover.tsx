import * as React from 'react';
import { PopoverContextValue, PopoverProvider } from '@fluentui/react-popover';
import type { TeachingPopoverState } from './TeachingPopover.types';

/**
 * Render the final JSX of TeachingPopover
 */
export const renderTeachingPopover_unstable = (state: TeachingPopoverState, contextValues: PopoverContextValue) => {
  return (
    // Popover passes context values as part of PopoverState that we inherit
    <PopoverProvider value={contextValues}>
      {state.popoverTrigger}
      {state.open && state.popoverSurface}
    </PopoverProvider>
  );
};
