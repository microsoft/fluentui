import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';
import { ComponentRender } from '@fluentui/react-utilities';

export type MenuItemRadioProps = MenuItemProps & MenuItemSelectableProps;

export type MenuItemRadioState = MenuItemState & MenuItemSelectableState;

export type MenuItemRadioRender = ComponentRender<MenuItemRadioState>;
