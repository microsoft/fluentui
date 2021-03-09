import { MenuTriggerState } from './MenuTrigger.types';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 * {@docCategory MenuTrigger }
 */
export const renderMenuTrigger = (state: MenuTriggerState) => {
  return state.children;
};
