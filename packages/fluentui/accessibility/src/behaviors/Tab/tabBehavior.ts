import { keyboardKey, SpacebarKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility, AccessibilityAttributes } from '../../types';

/**
 * @specification
 * Adds role 'presentation' to 'wrapper' slot.
 * Adds role 'tab' to 'root' slot.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'aria-selected=true' based on the property 'active'. This can be overriden by providing 'aria-selected' property directly to the component.
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'root' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' slot.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'root' slot.
 * Adds attribute 'aria-controls' based on the property 'aria-controls' to 'root' slot.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
export const tabBehavior: Accessibility<TabBehaviorProps> = props => ({
  attributes: {
    wrapper: {
      role: 'presentation',
      'data-tabs': 'true',
    },
    root: {
      role: 'tab',
      tabIndex: 0,
      'aria-selected': !!props.active,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-describedby': props['aria-describedby'],
      'aria-controls': props['aria-controls'],
      'aria-disabled': props['disabled'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },

  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
  },
});

export type TabBehaviorProps = {
  /** Indicates if tab is selected. */
  active?: boolean;
  /** Indicates if tab is disabled. */
  disabled?: boolean;
} & Pick<AccessibilityAttributes, 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-controls'>;
