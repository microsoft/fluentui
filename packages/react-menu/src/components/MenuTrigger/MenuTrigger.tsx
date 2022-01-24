import * as React from 'react';
import { useMenuTrigger_unstable } from './useMenuTrigger';
import { renderMenuTrigger_unstable } from './renderMenuTrigger';
import type { MenuTriggerProps } from './MenuTrigger.types';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 */
export const MenuTrigger = React.forwardRef<HTMLElement, MenuTriggerProps>((props, ref) => {
  const state = useMenuTrigger_unstable(props, ref);

  return renderMenuTrigger_unstable(state);
});

MenuTrigger.displayName = 'MenuTrigger';
