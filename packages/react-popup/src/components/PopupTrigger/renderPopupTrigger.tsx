import { PopupTriggerState } from './PopupTrigger.types';

/**
 * Render the final JSX of PopupTrigger
 */
export const renderPopupTrigger = (state: PopupTriggerState): JSX.Element => {
  return state.children;
};
