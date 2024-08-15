import type { DialogTriggerState } from './DialogTrigger.types';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderDialogTrigger_unstable = (state: DialogTriggerState) => state.children;
