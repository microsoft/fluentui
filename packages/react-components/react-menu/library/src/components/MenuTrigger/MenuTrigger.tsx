import * as React from 'react';
import { useMenuTrigger_unstable } from './useMenuTrigger';
import { renderMenuTrigger_unstable } from './renderMenuTrigger';
import type { MenuTriggerProps } from './MenuTrigger.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 */
export const MenuTrigger: React.FC<MenuTriggerProps> = props => {
  const state = useMenuTrigger_unstable(props);

  return renderMenuTrigger_unstable(state);
};

MenuTrigger.displayName = 'MenuTrigger';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(MenuTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
