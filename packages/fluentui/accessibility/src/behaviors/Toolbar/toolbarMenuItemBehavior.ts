import { Accessibility } from '../../types';
import { menuItemBehavior, MenuItemBehaviorProps } from '../Menu/menuItemBehavior';

/**
 * @description
 * The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
 *
 * @specification
 * Adds role 'presentation' to 'wrapper' slot.
 * Adds role 'menuitem' to 'root' slot.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'root' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' slot.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'root' slot.
 * Adds attribute 'aria-expanded=true' based on the property 'menuOpen' if the component has 'hasMenu' property to 'root' slot.
 * Adds attribute 'aria-haspopup=true' to 'root' slot if 'hasMenu' property is set.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'closeMenuAndFocusTrigger' action with 'Escape' on 'wrapper'.
 * Triggers 'closeAllMenusAndFocusNextParentItem' action with 'ArrowRight' on 'wrapper'.
 * Triggers 'closeMenu' action with 'ArrowLeft' on 'wrapper'.
 * Triggers 'openMenu' action with 'ArrowRight' on 'wrapper'.
 */
export const toolbarMenuItemBehavior: Accessibility<ToolbarMenuItemBehaviorProps> = props => {
  return menuItemBehavior({ ...props, vertical: true });
};

export type ToolbarMenuItemBehaviorProps = Omit<MenuItemBehaviorProps, 'vertical'>;
