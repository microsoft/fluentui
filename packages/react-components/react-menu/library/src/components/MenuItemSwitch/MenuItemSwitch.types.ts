import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MenuItemSlots } from '../MenuItem/MenuItem.types';
import { MenuItemSelectableState } from '../../selectable/types';
import { MenuItemCheckboxProps } from '../MenuItemCheckbox/MenuItemCheckbox.types';

export type MenuItemSwitchSlots = Pick<MenuItemSlots, 'root' | 'content' | 'secondaryContent' | 'icon'> & {
  switchIndicator?: Slot<'span'>;
};

/**
 * MenuItemSwitch Props
 */
export type MenuItemSwitchProps = ComponentProps<MenuItemSwitchSlots> &
  Pick<MenuItemCheckboxProps, 'disabled' | 'persistOnClick' | 'name' | 'value'>;

/**
 * State used in rendering MenuItemSwitch
 */
export type MenuItemSwitchState = ComponentState<MenuItemSwitchSlots> &
  MenuItemSelectableState &
  Required<Pick<MenuItemSwitchProps, 'disabled'>>;
