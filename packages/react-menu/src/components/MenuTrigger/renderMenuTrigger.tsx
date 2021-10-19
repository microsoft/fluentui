import * as React from 'react';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuTriggerState } from './MenuTrigger.types';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderMenuTrigger = (state: MenuTriggerState) => {
  return <MenuTriggerContextProvider value={true}>{state.children}</MenuTriggerContextProvider>;
};
