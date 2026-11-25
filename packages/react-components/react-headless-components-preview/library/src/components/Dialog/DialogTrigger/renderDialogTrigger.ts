import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogTriggerState } from './DialogTrigger.types';

/**
 * Render the final JSX of DialogTrigger: the child element with the trigger behavior applied.
 */
export const renderDialogTrigger = (state: DialogTriggerState): JSXElement | null => {
  return state.children;
};
