import { Accessibility } from '../../types';
import { SpacebarKey } from '../../keyboard-key';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

/**
 * @description
 * Provides navigation inside the inner focus zone using Tab key
 * @specification
 *  Adds role='radio'. This allows screen readers to handle the component as a radio button.
 *  Adds attribute 'aria-checked=true' based on the property 'checked'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 *  Adds attribute 'data-is-focusable=true' based on the property 'checked'.
 *  Triggers 'performClick' action with 'Spacebar' on 'root'.
 *  Implements roving tabIndex.
 */
export const radioGroupItemBehavior: Accessibility<RadioGroupItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'radio',
      tabIndex: props.checked ? 0 : -1,
      ...(props.checked && { [IS_FOCUSABLE_ATTRIBUTE]: true }),
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
    },
  },

  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: SpacebarKey }],
      },
    },
  },
});

export type RadioGroupItemBehaviorProps = {
  /** Indicates if radio item is selected. */
  checked?: boolean;
  /** Indicates if radio item is disabled. */
  disabled?: boolean;
};
