import type { JSXElement } from '@fluentui/react-utilities';
import type { PopoverTriggerState } from './PopoverTrigger.types';

/**
 * Render the final JSX of PopoverTrigger
 */
export const renderPopoverTrigger_unstable = (state: PopoverTriggerState): JSXElement | null => {
  return state.children;
};
