import { Accessibility } from '../../types';
import { CardBehaviorProps } from './cardBehavior';
import * as keyboardKey from 'keyboard-key';

/**
 * @description
 * Behavior for a focusable card component
 * @specification
 * Adds role='group'.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const cardFocusableBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
      tabIndex: 0,
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
