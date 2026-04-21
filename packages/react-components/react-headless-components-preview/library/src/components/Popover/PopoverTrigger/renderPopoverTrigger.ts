import type { PopoverTriggerState } from './PopoverTrigger.types';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Renders the PopoverTrigger (returns the cloned child element).
 */
export const renderPopoverTrigger = (state: PopoverTriggerState): JSXElement | null => {
  return state.children;
};
