import { keyboardKey, SpacebarKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility } from '../../types';
import { MenuItemBehaviorProps } from '../Menu/menuItemBehavior';

/**
 * @description
 * The behavior is designed for particular structure of menu item. The item consists of root element and anchor inside the root element.
 *
 * @specification
 * Adds role 'presentation' to 'wrapper' slot.
 * Adds role 'button' to 'root' slot.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'root' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' slot.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'root' slot.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Adds attribute 'aria-haspopup=true' to 'root' slot if 'hasMenu' property is set.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'wrapper'.
 * Triggers 'closeMenuAndFocusTrigger' action with 'Escape' on 'wrapper'.
 * Triggers 'openMenu' action with 'ArrowDown' on 'wrapper', when orientation is horizontal.
 * Triggers 'doNotNavigateNextParentItem' action with 'ArrowLeft' or 'ArrowRight' on 'wrapper', when toolbar button has submenu and it is opened.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
export const menuItemAsToolbarButtonBehavior: Accessibility<MenuItemBehaviorProps> = props => ({
  attributes: {
    wrapper: {
      role: 'presentation',
    },
    root: {
      role: 'button',
      tabIndex: 0,
      'aria-haspopup': props.hasMenu ? 'true' : undefined,
      'aria-disabled': props['disabled'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },

  keyActions: {
    wrapper: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
      closeMenuAndFocusTrigger: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
      openMenu: !props.vertical && {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
      doNotNavigateNextParentItem: {
        keyCombinations:
          props.hasMenu && props.menuOpen
            ? [{ keyCode: keyboardKey.ArrowLeft }, { keyCode: keyboardKey.ArrowRight }]
            : null,
      },
    },
  },
});
