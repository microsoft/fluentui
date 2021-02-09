import * as React from 'react';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import { useCheckmarkStyles } from '../../selectable/index';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox` hook.
 * {@docCategory MenuItemCheckbox}
 */
export const MenuItemCheckbox = React.forwardRef<HTMLElement, MenuItemCheckboxProps>((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  useMenuItemStyles(state);
  useCheckmarkStyles(state);

  return renderMenuItemCheckbox(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
