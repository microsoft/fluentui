import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

export interface MenuItemCheckboxProps extends MenuItemProps, MenuItemSelectableProps {}

export interface MenuItemCheckboxState extends MenuItemState, MenuItemSelectableState {}
