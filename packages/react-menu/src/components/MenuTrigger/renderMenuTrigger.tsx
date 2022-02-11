import * as React from 'react';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuTriggerRender } from './MenuTrigger.types';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderMenuTrigger_unstable: MenuTriggerRender = state => {
  return <MenuTriggerContextProvider value={true}>{state.children}</MenuTriggerContextProvider>;
};
