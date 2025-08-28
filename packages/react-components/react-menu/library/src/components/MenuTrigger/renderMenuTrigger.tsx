import * as React from 'react';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuTriggerState } from './MenuTrigger.types';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderMenuTrigger_unstable = (state: MenuTriggerState): JSXElement => {
  return <MenuTriggerContextProvider value={state.isSubmenu}>{state.children}</MenuTriggerContextProvider>;
};
