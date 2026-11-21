import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayStyles, CalendarDayStyleProps } from './CalendarDay.types';
import styles from './CalendarDay.module.css';

/**
 * @internal
 */
export const calendarDayClassNames: SlotClassNames<CalendarDayStyles> = {
  root: 'fui-CalendarDay',
  header: 'fui-CalendarDay__header',
  monthAndYear: 'fui-CalendarDay__monthAndYear',
  monthComponents: 'fui-CalendarDay__monthComponents',
  headerIconButton: 'fui-CalendarDay__headerIconButton',
  disabledStyle: 'fui-CalendarDay__disabledStyle',
};

/**
 * Apply styling to the CalendarDay slots based on the state
 *
 * @internal
 */
export const useCalendarDayStyles_unstable = (props: CalendarDayStyleProps): CalendarDayStyles => {
  const { className, headerIsClickable, showWeekNumbers } = props;

  return {
    root: clsx(
      calendarDayClassNames.root,
      styles.normalize,
      styles.root,
      showWeekNumbers && styles.rootShowWeekNumbers,
      className,
    ),
    header: clsx(calendarDayClassNames.header, styles.header),
    monthAndYear: clsx(
      calendarDayClassNames.monthAndYear,
      styles.monthAndYear,
      headerIsClickable && styles.monthAndYearHeaderIsClickable,
    ),
    monthComponents: clsx(calendarDayClassNames.monthComponents, styles.monthComponents),
    headerIconButton: clsx(calendarDayClassNames.headerIconButton, styles.headerIconButton),
    disabledStyle: clsx(calendarDayClassNames.disabledStyle, styles.disabledStyle),
  };
};
