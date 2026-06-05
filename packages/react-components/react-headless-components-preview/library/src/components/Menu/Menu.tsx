'use client';

import type * as React from 'react';
import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';
import { renderMenu } from './renderMenu';
import type { MenuProps } from './Menu.types';

/**
 * Headless Menu component.
 */
export const Menu: React.FC<MenuProps> = props => {
  const state = useMenu(props);
  const contextValues = useMenuContextValues(state);

  return renderMenu(state, contextValues);
};

Menu.displayName = 'Menu';
