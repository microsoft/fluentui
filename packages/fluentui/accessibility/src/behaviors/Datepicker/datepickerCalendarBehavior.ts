import { Accessibility } from '../../types';
import { datepickerCalendarGridBehavior } from './datepickerCalendarGridBehavior';
import { keyboardKey } from '@fluentui/keyboard-key';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Applies 'datepickerCalendarGridBehavior' for 'calendarGrid' child component.
 */
export const datepickerCalendarBehavior: Accessibility<DatepickerCalendarBehaviorProps> = props => ({
  childBehaviors: {
    calendarGrid: datepickerCalendarGridBehavior,
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
