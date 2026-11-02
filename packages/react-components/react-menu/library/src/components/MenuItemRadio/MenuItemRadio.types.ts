import type { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import type { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

export type MenuItemRadioProps = MenuItemProps & MenuItemSelectableProps;

export type MenuItemRadioState = MenuItemState & MenuItemSelectableState;

/**
 * Since MenuItemRadio has no design props, MenuItemRadioBaseProps equals MenuItemRadioProps
 */
export type MenuItemRadioBaseProps = MenuItemRadioProps;

/**
 * Since MenuItemRadio has no design props, MenuItemRadioBaseState equals MenuItemRadioState
 */
export type MenuItemRadioBaseState = MenuItemRadioState;
