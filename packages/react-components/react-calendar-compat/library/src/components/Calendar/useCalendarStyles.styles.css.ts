import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarStyles, CalendarStyleProps } from './Calendar.types';
import styles from './Calendar.module.css';

/**
 * @internal
 */
export const calendarClassNames: SlotClassNames<CalendarStyles> = {
  root: 'fui-Calendar',
  divider: 'fui-Calendar__divider',
  goTodayButton: 'fui-Calendar__goTodayButton',
  monthPickerWrapper: 'fui-Calendar__monthPickerWrapper',
  liveRegion: 'fui-Calendar__liveRegion',
};

/**
 * Apply styling to the Calendar slots based on the state
 *
 * @internal
 */
export const useCalendarStyles_unstable = (props: CalendarStyleProps): CalendarStyles => {
  const { className, isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = props;

  return {
    root: clsx(
      calendarClassNames.root,
      styles.root,
      styles.normalize,
      isDayPickerVisible && styles.isDayPickerVisible,
      isMonthPickerVisible && styles.isMonthPickerVisible,
      showWeekNumbers && styles.showWeekNumbers,
      className,
    ),
    divider: clsx(calendarClassNames.divider, styles.divider),
    monthPickerWrapper: clsx(calendarClassNames.monthPickerWrapper, styles.monthPickerWrapper),
    goTodayButton: clsx(calendarClassNames.goTodayButton, styles.goTodayButton),
    liveRegion: clsx(calendarClassNames.liveRegion, styles.liveRegion),
  };
};
