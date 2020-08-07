import { Accessibility } from '../../types';
import { keyboardKey } from '@fluentui/keyboard-key';

/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'clear' action with 'Escape' on 'input'.
 */
export const inputBehavior: Accessibility<InputBehaviorProps> = props => ({
  attributes: {
    root: {
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
