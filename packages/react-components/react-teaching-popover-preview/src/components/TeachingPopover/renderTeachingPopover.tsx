import * as React from 'react';
import { PopoverProvider } from '@fluentui/react-popover';
import { TeachingPopoverProvider } from '../../TeachingPopoverContext';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

/**
 * Render the final JSX of TeachingPopover
 */
export const renderTeachingPopover_unstable = (
  state: TeachingPopoverState,
  contextValues: TeachingPopoverContextValues,
) => {
  return (
    // Popover passes context values as part of PopoverState that we inherit
    <PopoverProvider value={contextValues.popover}>
      <TeachingPopoverProvider value={contextValues.teachingPopover}>
        {state.popoverTrigger}
        {state.open && state.popoverSurface}
      </TeachingPopoverProvider>
    </PopoverProvider>
  );
};
