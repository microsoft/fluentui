import { Accessibility } from '../../types';
import { CardBehaviorProps } from './cardBehavior';
import * as keyboardKey from 'keyboard-key';

/**
 * @description
 * Behavior for a focusable card component
 * @specification
 * Adds role='button'.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'aria-roledescription' based on the property 'ariaRoleDescription' to 'root' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const cardFocusableBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'button',
      tabIndex: 0,
      'aria-roledescription': props.ariaRoleDescription,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
});

export default cardFocusableBehavior;
