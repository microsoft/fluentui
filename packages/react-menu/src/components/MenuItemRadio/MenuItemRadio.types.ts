import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

export interface MenuItemRadioProps extends MenuItemProps, MenuItemSelectableProps {}

export interface MenuItemRadioState extends MenuItemState, MenuItemSelectableState {}
