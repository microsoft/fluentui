import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

export type MenuItemRadioProps = MenuItemProps & MenuItemSelectableProps;

export type MenuItemRadioState = MenuItemState & MenuItemSelectableState;
