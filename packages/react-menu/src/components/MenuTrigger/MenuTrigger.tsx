import * as React from 'react';
import { useMenuTrigger } from './useMenuTrigger';
import { renderMenuTrigger } from './renderMenuTrigger';
import type { MenuTriggerProps } from './MenuTrigger.types';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 */
export const MenuTrigger: React.FC<MenuTriggerProps> = props => {
  const state = useMenuTrigger(props);

  return renderMenuTrigger(state);
};

MenuTrigger.displayName = 'MenuTrigger';
