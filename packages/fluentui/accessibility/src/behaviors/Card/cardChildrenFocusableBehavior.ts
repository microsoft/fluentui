import { Accessibility } from '../../types';
import { CardBehaviorProps } from './cardBehavior';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { FocusZoneTabbableElements } from '../../focusZone/types';
import { keyboardKey } from '../../keyboard-key';

/**
 * @description
 * Behavior for a card component with multiple focusable child elements.
 * @specification
 * Adds role='group'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Triggers 'focusCard' action with 'Escape' on 'root'.
 */
export const cardChildrenFocusableBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
      tabIndex: 0,
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      'aria-disabled': props.disabled,
    },
  },
  focusZone: {
    props: {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
    },
  },
  keyActions: {
    root: {
      focusCard: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
});
