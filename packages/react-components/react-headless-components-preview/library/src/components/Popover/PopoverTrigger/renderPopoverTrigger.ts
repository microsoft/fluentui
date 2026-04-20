import type * as React from 'react';
import type { PopoverTriggerState } from './PopoverTrigger.types';

/**
 * Renders the PopoverTrigger (returns the cloned child element).
 */
export const renderPopoverTrigger = (state: PopoverTriggerState): React.ReactElement | null => {
  return state.children;
};
