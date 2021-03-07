import * as React from 'react';
import { useMenuTrigger } from './useMenuTrigger';
import { MenuTriggerProps } from './MenuTrigger.types';
import { renderMenuTrigger } from './renderMenuTrigger';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 * {@docCategory MenuTrigger }
 */
export const MenuTrigger = React.forwardRef<HTMLElement, MenuTriggerProps>((props, ref) => {
  const state = useMenuTrigger(props, ref);

  return renderMenuTrigger(state);
});

MenuTrigger.displayName = 'MenuTrigger';
