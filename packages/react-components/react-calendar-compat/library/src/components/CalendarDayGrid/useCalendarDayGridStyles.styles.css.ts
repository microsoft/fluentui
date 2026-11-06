import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridStyles, CalendarDayGridStyleProps } from './CalendarDayGrid.types';
import styles from './CalendarDayGrid.module.css';

/**
 * @internal
 */
export const calendarDayGridClassNames: SlotClassNames<CalendarDayGridStyles> = {
  wrapper: 'fui-CalendarDayGrid__wrapper',
  table: 'fui-CalendarDayGrid__table',
  dayCell: 'fui-CalendarDayGrid__dayCell',
  daySelected: 'fui-CalendarDayGrid__daySelected',
  daySingleSelected: 'fui-CalendarDayGrid__daySingleSelected',
  weekRow: 'fui-CalendarDayGrid__weekRow',
  weekDayLabelCell: 'fui-CalendarDayGrid__weekDayLabelCell',
  weekNumberCell: 'fui-CalendarDayGrid__weekNumberCell',
  dayOutsideBounds: 'fui-CalendarDayGrid__dayOutsideBounds',
  dayOutsideNavigatedMonth: 'fui-CalendarDayGrid__dayOutsideNavigatedMonth',
  dayButton: 'fui-CalendarDayGrid__dayButton',
  dayIsToday: 'fui-CalendarDayGrid__dayIsToday',
  firstTransitionWeek: 'fui-CalendarDayGrid__firstTransitionWeek',
  lastTransitionWeek: 'fui-CalendarDayGrid__lastTransitionWeek',
  dayMarker: 'fui-CalendarDayGrid__dayMarker',
  dayTodayMarker: 'fui-CalendarDayGrid__dayTodayMarker',
};

/**
 * @internal
 */
export const extraCalendarDayGridClassNames = {
  hoverStyle: 'fui-CalendarDayGrid__hoverStyle',
  pressedStyle: 'fui-CalendarDayGrid__pressedStyle',
};

/**
 * Apply styling to the CalendarDayGrid slots based on the state
 *
 * @internal
 */
export const useCalendarDayGridStyles_unstable = (props: CalendarDayGridStyleProps): CalendarDayGridStyles => {
  const { lightenDaysOutsideNavigatedMonth, showWeekNumbers } = props;

  return {
    wrapper: clsx(calendarDayGridClassNames.wrapper, styles.wrapper),
    table: clsx(calendarDayGridClassNames.table, styles.table, showWeekNumbers && styles.tableShowWeekNumbers),
    dayCell: clsx(
      calendarDayGridClassNames.dayCell,
      styles.dayCell,
      styles.dayCellFocusIndicator,
      styles.cornerBorderAndRadiusCorners,
    ),
    daySelected: clsx(calendarDayGridClassNames.daySelected, styles.daySelected),
    daySingleSelected: clsx(calendarDayGridClassNames.daySingleSelected, styles.daySingleSelected),
    weekRow: clsx(calendarDayGridClassNames.weekRow, styles.weekRow),
    weekDayLabelCell: clsx(calendarDayGridClassNames.weekDayLabelCell, styles.weekDayLabelCell),
    weekNumberCell: clsx(calendarDayGridClassNames.weekNumberCell, styles.weekNumberCell),
    dayOutsideBounds: clsx(calendarDayGridClassNames.dayOutsideBounds, styles.dayOutsideBounds),
    dayOutsideNavigatedMonth: clsx(
      calendarDayGridClassNames.dayOutsideNavigatedMonth,
      lightenDaysOutsideNavigatedMonth && styles.dayOutsideNavigatedMonthLightenDaysOutsideNavigatedMonth,
    ),
    dayButton: clsx(calendarDayGridClassNames.dayButton, styles.dayButton),
    dayIsToday: clsx(calendarDayGridClassNames.dayIsToday, styles.dayIsToday),
    firstTransitionWeek: clsx(calendarDayGridClassNames.firstTransitionWeek, styles.firstTransitionWeek),
    lastTransitionWeek: clsx(calendarDayGridClassNames.lastTransitionWeek, styles.lastTransitionWeek),
    dayMarker: clsx(calendarDayGridClassNames.dayMarker, styles.dayMarker),
    dayTodayMarker: clsx(calendarDayGridClassNames.dayTodayMarker, styles.dayTodayMarker),
  };
};
