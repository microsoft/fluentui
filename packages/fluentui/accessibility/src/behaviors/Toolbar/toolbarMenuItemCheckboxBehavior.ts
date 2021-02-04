import { keyboardKey, SpacebarKey } from '../../keyboard-key';
import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'aria-checked=true' based on the property 'active'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 * Adds role='menuitemcheckbox'.
 * Adds role 'presentation' to 'wrapper' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
export const toolbarMenuItemCheckboxBehavior: Accessibility<ToolbarMenuItemCheckboxBehaviorProps> = props => ({
  attributes: {
    wrapper: {
      role: 'presentation',
    },
    root: {
      'aria-checked': props.active,
      'aria-disabled': props.disabled,
      role: 'menuitemcheckbox',
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

type ToolbarMenuItemCheckboxBehaviorProps = {
  active?: boolean;
  disabled?: boolean;
};
