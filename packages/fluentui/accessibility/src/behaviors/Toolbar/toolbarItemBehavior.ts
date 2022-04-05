import { keyboardKey, SpacebarKey } from '../../keyboard-key';

import { Accessibility } from '../../types';
import { buttonBehavior, ButtonBehaviorProps } from '../Button/buttonBehavior';

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-haspopup=menu' to 'root' slot if 'hasMenu' property is set.
 * Adds attribute 'aria-haspopup=dialog' to 'root' slot if 'hasPopup' property is set.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'closeMenuAndFocusTrigger' action with 'Escape' on 'wrapper', when toolbar button has submenu and it is opened.
 * Triggers 'doNotNavigateNextToolbarItem' action with 'ArrowLeft' or 'ArrowRight' on 'wrapper', when toolbar button has submenu and it is opened.
 * Adds attribute 'disabled=true' based on the property 'disabled'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabledFocusable'.
 */
export const toolbarItemBehavior: Accessibility<ToolbarItemBehaviorProps> = props => {
  const behaviorData = buttonBehavior(props);
  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'aria-haspopup': props.hasPopup ? 'dialog' : props.hasMenu ? 'menu' : undefined,
    disabled: props.disabled,
    'aria-disabled': props.disabledFocusable,
  };
  behaviorData.keyActions.wrapper = {
    ...behaviorData.keyActions.wrapper,
    performWrapperClick: {
      keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
    },
    closeMenuAndFocusTrigger: {
      keyCombinations:
        props.hasMenu && props.menuOpen
          ? [{ keyCode: keyboardKey.Escape }, { keyCode: keyboardKey.Tab, shiftKey: true }]
          : null,
    },
    doNotNavigateNextToolbarItem: {
      keyCombinations:
        props.hasMenu && props.menuOpen
          ? [{ keyCode: keyboardKey.ArrowLeft }, { keyCode: keyboardKey.ArrowRight }]
          : null,
    },
  };
  return behaviorData;
};

export type ToolbarItemBehaviorProps = {
  /** Indicated if toolbar item has a menu. */
  hasMenu?: boolean;
  /** If the menu is in open state. */
  menuOpen?: boolean;
  /** Indicated if toolbar item has a popup. */
  hasPopup?: boolean;
} & ButtonBehaviorProps;
