import type { DialogTriggerState } from './DialogTrigger.types';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderDialogTrigger_unstable = (state: DialogTriggerState): JSXElement | null => state.children;
