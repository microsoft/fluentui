import * as React from 'react';
import { MenuTriggerState } from './MenuTrigger.types';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 * {@docCategory MenuTrigger }
 */
export const renderMenuTrigger = (state: MenuTriggerState) => {
  return <MenuTriggerContextProvider value={true}>{state.children}</MenuTriggerContextProvider>;
};
