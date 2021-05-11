import { Accessibility } from '../../types';
import { datepickerCalendarGridBehavior } from './datepickerCalendarGridBehavior';
import { datepickerCalendarGridRowBehavior } from './datepickerCalendarGridRowBehavior';
import { keyboardKey } from '../../keyboard-key';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Applies 'datepickerCalendarGridBehavior' for 'calendarGrid' child component.
 */
export const datepickerCalendarBehavior: Accessibility<DatepickerCalendarBehaviorProps> = () => ({
  childBehaviors: {
    calendarGrid: datepickerCalendarGridBehavior,
    calendarGridRow: datepickerCalendarGridRowBehavior,
  },
  keyActions: {
    calendarCell: {
      addWeek: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
      subtractWeek: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
      },
      addDay: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      subtractDay: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
      moveToStartOfWeek: {
        keyCombinations: [{ keyCode: keyboardKey.Home, ctrlKey: false }],
      },
      moveToEndOfWeek: {
        keyCombinations: [{ keyCode: keyboardKey.End, ctrlKey: false }],
      },
      moveToStartOfColumn: {
        keyCombinations: [{ keyCode: keyboardKey.PageUp }],
      },
      moveToEndOfColumn: {
        keyCombinations: [{ keyCode: keyboardKey.PageDown }],
      },
    },
  },
});

export type DatepickerCalendarBehaviorProps = never;
