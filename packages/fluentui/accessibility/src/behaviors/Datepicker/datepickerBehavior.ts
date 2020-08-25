import { Accessibility } from '../../types';
import { keyboardKey } from '@fluentui/keyboard-key';

/**
 * @description
 * Behavior for a datepicker component
 * @specification
 * Triggers 'open' action with 'Enter' on 'input'.
 */

export const datepickerBehavior: Accessibility<DatepickerBehaviorProps> = props => ({
  keyActions: {
    input: {
      open: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }],
      },
    },
  },
});

export type DatepickerBehaviorProps = never;
