import { Accessibility } from '../../types';
import { keyboardKey } from '@fluentui/keyboard-key';

/**
 * @description
 * Behavior for a datepicker component
 * @specification
 * Provides action key mappings.
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
