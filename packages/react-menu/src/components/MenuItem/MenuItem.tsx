import * as React from 'react';
import { useMenuItem } from './useMenuItem';
import { renderMenuItem } from './renderMenuItem';
import { useMenuItemStyles } from './useMenuItemStyles';
import { useCheckmarkStyles } from '../../selectable/index';
import type { MenuItemProps } from './MenuItem.types';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItem, using the `useMenuItem` and `useMenuItemStyles` hook.
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef((props, ref) => {
  const state = useMenuItem(props, ref);

  useMenuItemStyles(state);
  useCheckmarkStyles(state as MenuItemCheckboxState);
  return renderMenuItem(state);
});

MenuItem.displayName = 'MenuItem';
