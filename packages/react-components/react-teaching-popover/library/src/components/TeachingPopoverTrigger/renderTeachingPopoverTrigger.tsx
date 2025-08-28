import type { JSXElement } from '@fluentui/react-utilities';
import { TeachingPopoverTriggerState } from './TeachingPopoverTrigger.types';

/**
 * Render the final JSX of TeachingPopoverTrigger
 */
export const renderTeachingPopoverTrigger_unstable = (state: TeachingPopoverTriggerState): JSXElement | null => {
  return state.children;
};
