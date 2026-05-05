'use client';

import * as React from 'react';
import { useMenuListContextValues_unstable } from '@fluentui/react-menu';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuList } from './useMenuList';
import { renderMenuList } from './renderMenuList';
import type { MenuListProps } from './MenuList.types';

/**
 * Headless MenuList component.
 *
 * Renders a `role="menu"` container, applies controlled `checkedValues` for
 * MenuItemCheckbox/Radio descendants, and exposes a DOM-walking
 * `setFocusByFirstCharacter` for type-ahead. Arrow-key navigation is left to
 * the consumer.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues_unstable(state);
  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
