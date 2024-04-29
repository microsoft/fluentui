import { Accessibility, AccessibilityAttributes } from '../../types';
import { keyboardKey } from '../../keyboard-key';

/**
 * @description
 * Behavior for a datepicker component
 * @specification
 * Triggers 'open' action with 'Enter' on 'input'.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'input' slot.
 * Adds attribute 'aria-invalid' based on the property 'aria-invalid' to 'input' slot.
 */

export const datepickerBehavior: Accessibility<DatepickerBehaviorProps> = props => ({
  attributes: {
    input: {
      'aria-labelledby': props['aria-labelledby'],
      'aria-invalid': props['aria-invalid'],
      ...(!props.allowManualInput && { 'aria-haspopup': true }),
    },
  },
  keyActions: {
    input: {
      open: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }],
      },
    },
  },
});

export type DatepickerBehaviorProps = {
  'aria-labelledby'?: AccessibilityAttributes['aria-labelledby'];
  'aria-invalid'?: AccessibilityAttributes['aria-invalid'];
  allowManualInput?: boolean;
};
