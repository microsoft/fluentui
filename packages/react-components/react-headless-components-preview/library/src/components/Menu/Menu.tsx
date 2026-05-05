'use client';

import type * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';
import { renderMenu } from './renderMenu';
import type { MenuProps } from './Menu.types';

/**
 * Headless Menu component.
 *
 * Wires up ARIA, controlled open state, positioning, and selection state
 * via v9's `useMenuBase_unstable`. Children must be either
 * `[MenuTrigger, MenuPopover]` or a single `MenuPopover` (when an external
 * trigger is wired through context).
 */
export const Menu: React.FC<MenuProps> = props => {
  const state = useMenu(props);
  const contextValues = useMenuContextValues(state);

  return renderMenu(state, contextValues) as JSXElement;
};

Menu.displayName = 'Menu';
