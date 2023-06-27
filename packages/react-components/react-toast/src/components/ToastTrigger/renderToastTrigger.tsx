import type { ToastTriggerState } from './ToastTrigger.types';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderToastTrigger_unstable = (state: ToastTriggerState) => state.children;
