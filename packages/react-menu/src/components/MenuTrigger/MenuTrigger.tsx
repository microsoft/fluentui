import * as React from 'react';
import { useMenuTrigger } from './useMenuTrigger';
import { MenuTriggerProps } from './MenuTrigger.types';
import { renderMenuTrigger } from './renderMenuTrigger';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 * {@docCategory MenuTrigger }
 */
export const MenuTrigger: React.FC<MenuTriggerProps> = props => {
  const state = useMenuTrigger(props);

  return renderMenuTrigger(state);
};

MenuTrigger.displayName = 'MenuTrigger';
