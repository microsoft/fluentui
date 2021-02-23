import { Accessibility } from '../../types';
import { keyboardKey } from '../../keyboard-key';

/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled' to 'input' slot.
 * Adds attribute 'aria-required=true' based on the property 'required' to 'input' slot.
 * Adds attribute 'aria-invalid=true' based on the property 'error' to 'input' slot.
 * Triggers 'clear' action with 'Escape' on 'input'.
 */
export const inputBehavior: Accessibility<InputBehaviorProps> = props => ({
  attributes: {
    input: {
      'aria-disabled': props.disabled,
      ...(props.required && { 'aria-required': true }),
      ...(props.error && { 'aria-invalid': true }),
    },
  },
  keyActions: {
    input: {
      clear: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
});

export type InputBehaviorProps = {
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
};
