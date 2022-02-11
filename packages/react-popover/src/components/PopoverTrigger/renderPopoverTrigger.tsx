import type { PopoverTriggerRender } from './PopoverTrigger.types';

/**
 * Render the final JSX of PopoverTrigger
 */
export const renderPopoverTrigger_unstable: PopoverTriggerRender = state => {
  return state.children;
};
