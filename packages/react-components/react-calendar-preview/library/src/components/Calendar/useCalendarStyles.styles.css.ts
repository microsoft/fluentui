import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarSlots, CalendarState } from './Calendar.types';
import styles from './Calendar.module.css';

/**
 * The pickers are not listed: each owns its own root class name.
 */
export const calendarClassNames: SlotClassNames<CalendarSlots> = {
  root: 'fui-Calendar',
  divider: 'fui-Calendar__divider',
  goToTodayButton: 'fui-Calendar__goToTodayButton',
  monthPickerWrapper: 'fui-Calendar__monthPickerWrapper',
  dayPicker: 'fui-Calendar__dayPicker',
  monthPicker: 'fui-Calendar__monthPicker',
  liveRegion: 'fui-Calendar__liveRegion',
};

/**
 * Apply styling to the Calendar slots based on the state.
 */
export const useCalendarStyles_unstable = (state: CalendarState): CalendarState => {
  const { isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = state;

  state.root.className = clsx(
    calendarClassNames.root,
    styles.root,
    styles.normalize,
    isDayPickerVisible && styles.isDayPickerVisible,
    isMonthPickerVisible && styles.isMonthPickerVisible,
    showWeekNumbers && styles.showWeekNumbers,
    state.root.className,
  );

  state.liveRegion.className = clsx(calendarClassNames.liveRegion, styles.liveRegion, state.liveRegion.className);

  if (state.divider) {
    state.divider.className = clsx(calendarClassNames.divider, styles.divider, state.divider.className);
  }

  if (state.monthPickerWrapper) {
    state.monthPickerWrapper.className = clsx(
      calendarClassNames.monthPickerWrapper,
      styles.monthPickerWrapper,
      state.monthPickerWrapper.className,
    );
  }

  if (state.goToTodayButton) {
    state.goToTodayButton.className = clsx(
      calendarClassNames.goToTodayButton,
      styles.goTodayButton,
      state.goToTodayButton.className,
    );
  }

  if (state.dayPicker) {
    state.dayPicker.className = clsx(calendarClassNames.dayPicker, state.dayPicker.className);
  }

  if (state.monthPicker) {
    state.monthPicker.className = clsx(calendarClassNames.monthPicker, state.monthPicker.className);
  }

  return state;
};
