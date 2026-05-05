'use client';

import type * as React from 'react';
import { useMenuTrigger } from './useMenuTrigger';
import { renderMenuTrigger } from './renderMenuTrigger';
import type { MenuTriggerProps } from './MenuTrigger.types';

/**
 * Headless MenuTrigger component.
 *
 * Clones its single child and applies the menu trigger props (ARIA, event
 * handlers, ref merging) needed to drive the parent Menu's open state.
 */
export const MenuTrigger: React.FC<MenuTriggerProps> = props => {
  const state = useMenuTrigger(props);
  return renderMenuTrigger(state);
};

MenuTrigger.displayName = 'MenuTrigger';
