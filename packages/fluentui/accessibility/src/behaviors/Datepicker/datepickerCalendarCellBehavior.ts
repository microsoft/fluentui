import { Accessibility } from '../../types';
// import { keyboardKey } from '@fluentui/keyboard-key';

/**
 * @description
 * Behavior for a datepicker calendar grid.
 * @specification
 */
export const datepickerCalendarCellBehavior: Accessibility<DatepickerCalendarCellBehaviorProps> = props => ({
  attributes: {},
});

export type DatepickerCalendarCellBehaviorProps = {
  disabled: boolean;
};
