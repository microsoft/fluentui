import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

export type MenuItemCheckboxProps = MenuItemProps & MenuItemSelectableProps;

export type MenuItemCheckboxState = MenuItemState & MenuItemSelectableState;
