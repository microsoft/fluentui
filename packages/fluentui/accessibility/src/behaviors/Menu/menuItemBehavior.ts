import { keyboardKey, SpacebarKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility, AccessibilityAttributes } from '../../types';

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
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'closeMenuAndFocusTrigger' action with 'Escape' on 'wrapper'.
 * Triggers 'closeAllMenusAndFocusNextParentItem' action with 'ArrowRight' on 'wrapper'.
 * Triggers 'closeMenu' action with 'ArrowLeft' on 'wrapper'.
 * Triggers 'openMenu' action with 'ArrowDown' on 'wrapper', when orientation is horizontal.
 * Triggers 'openMenu' action with 'ArrowRight' on 'wrapper', when orientation is vertical.
 */
export const menuItemBehavior: Accessibility<MenuItemBehaviorProps> = props => ({
  attributes: {
    wrapper: {
      role: 'presentation',
    },
    root: {
      role: 'menuitem',
      tabIndex: 0,
      'aria-expanded': props.hasMenu ? props.menuOpen || false : undefined,
      'aria-haspopup': props.hasMenu ? 'true' : undefined,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      'aria-disabled': props.disabled,
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },

  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
    wrapper: {
      closeAllMenus: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
      closeAllMenusAndFocusNextParentItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      closeMenuAndFocusTrigger: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
      closeMenu: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
      openMenu: {
        keyCombinations: [{ keyCode: props.vertical ? keyboardKey.ArrowRight : keyboardKey.ArrowDown }],
      },
    },
  },
});

export type MenuItemBehaviorProps = {
  /** Indicated if menu item has submenu. */
  hasMenu?: boolean | object;
  /** Defines if submenu is opened. */
  menuOpen?: boolean;
  /** If a menu item can is currently unable to be interacted with. */
  disabled?: boolean;
  /** If a menu displays elements vertically. */
  vertical?: boolean;
} & Pick<AccessibilityAttributes, 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-disabled'>;
