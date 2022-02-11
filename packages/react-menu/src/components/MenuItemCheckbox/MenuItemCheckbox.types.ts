import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';
import { ComponentRender } from '@fluentui/react-utilities';

export type MenuItemCheckboxProps = MenuItemProps & MenuItemSelectableProps;

export type MenuItemCheckboxState = MenuItemState & MenuItemSelectableState;

export type MenuItemCheckboxRender = ComponentRender<MenuItemCheckboxState>;
