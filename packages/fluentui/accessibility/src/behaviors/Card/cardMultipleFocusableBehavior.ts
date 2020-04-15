import { Accessibility } from '../../types';
import { CardBehaviorProps } from './cardBehavior';
import { IS_FOCUSABLE_ATTRIBUTE, FocusZoneDirection } from '../..';
import * as keyboardKey from 'keyboard-key';

/**
 * @description
 * Behavior for a card component with multiple focusable child elements.
 * @specification
 * Adds role='group'.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Adds attribute 'aria-roledescription' based on the property 'ariaRoleDescription' to 'root' slot.
 * Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key.
 * Provides arrow key navigation in bidirectional direction.
 * Triggers 'focusCard' action with 'Escape' on 'root'.
 */
const cardMultipleFocusableBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
      tabIndex: 0,
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      'aria-roledescription': props.ariaRoleDescription,
    },
  },
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectional,
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
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

export default cardMultipleFocusableBehavior;
