import * as React from 'react';
import { useMenuTrigger_unstable } from './useMenuTrigger';
import type { MenuTriggerProps } from './MenuTrigger.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 */
export const MenuTrigger: React.FC<MenuTriggerProps> & FluentTriggerComponent = props => {
  const [state, render] = useMenuTrigger_unstable(props);

  return render(state);
};

MenuTrigger.displayName = 'MenuTrigger';
MenuTrigger.isFluentTriggerComponent = true;
