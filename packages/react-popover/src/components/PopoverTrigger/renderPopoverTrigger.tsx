import { PopoverTriggerState } from './PopoverTrigger.types';

/**
 * Render the final JSX of PopoverTrigger
 */
export const renderPopoverTrigger = (state: PopoverTriggerState): JSX.Element => {
  return state.children;
};
