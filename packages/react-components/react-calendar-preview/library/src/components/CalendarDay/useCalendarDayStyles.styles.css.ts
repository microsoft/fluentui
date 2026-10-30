import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDaySlots, CalendarDayState } from './CalendarDay.types';
import styles from './CalendarDay.module.css';

export const calendarDayClassNames: SlotClassNames<CalendarDaySlots> = {
  root: 'fui-CalendarDay',
  header: 'fui-CalendarDay__header',
  heading: 'fui-CalendarDay__monthAndYear',
  navigation: 'fui-CalendarDay__monthComponents',
  previousMonthButton: 'fui-CalendarDay__previousMonthButton',
  nextMonthButton: 'fui-CalendarDay__nextMonthButton',
  closeButton: 'fui-CalendarDay__closeButton',
  grid: 'fui-CalendarDay__grid',
  body: 'fui-CalendarDay__body',
};

/**
 * Class names of the rows and cells rendered inside the day grid.
 */
export const calendarDayGridClassNames = {
  weekdayRow: 'fui-CalendarDayGridHeaderRow',
  weekNumberSpacerCell: 'fui-CalendarDayGridHeaderRow__weekNumberSpacerCell',
  weekdayCell: 'fui-CalendarDayGridHeaderCell',
  weekRow: 'fui-CalendarDayGridRow',
  weekNumberCell: 'fui-CalendarDayGridRow__weekNumberCell',
  dayCell: 'fui-CalendarDayGridCell',
  dayButton: 'fui-CalendarDayGridCell__button',
  dayLabel: 'fui-CalendarDayGridCell__dayLabel',
  marker: 'fui-CalendarDayGridCell__marker',
} as const;

/**
 * Apply styling to the CalendarDay slots based on the state.
 */
export const useCalendarDayStyles_unstable = (state: CalendarDayState): CalendarDayState => {
  const { headerIsClickable, lightenDaysOutsideNavigatedMonth, nextMonthInBounds, prevMonthInBounds, showWeekNumbers } =
    state;

  state.root.className = clsx(
    calendarDayClassNames.root,
    styles.normalize,
    styles.root,
    showWeekNumbers && styles.showWeekNumbers,
    state.root.className,
  );

  state.header.className = clsx(calendarDayClassNames.header, styles.header, state.header.className);

  state.grid.className = clsx(calendarDayClassNames.grid, styles.grid, state.grid.className);

  state.heading.className = clsx(
    calendarDayClassNames.heading,
    styles.monthAndYear,
    headerIsClickable && styles.monthAndYearHeaderIsClickable,
    state.heading.className,
  );

  state.navigation.className = clsx(
    calendarDayClassNames.navigation,
    styles.monthComponents,
    state.navigation.className,
  );

  state.previousMonthButton.className = clsx(
    calendarDayClassNames.previousMonthButton,
    styles.headerIconButton,
    !prevMonthInBounds && styles.disabledStyle,
    state.previousMonthButton.className,
  );

  state.nextMonthButton.className = clsx(
    calendarDayClassNames.nextMonthButton,
    styles.headerIconButton,
    !nextMonthInBounds && styles.disabledStyle,
    state.nextMonthButton.className,
  );

  if (state.closeButton) {
    state.closeButton.className = clsx(
      calendarDayClassNames.closeButton,
      styles.headerIconButton,
      state.closeButton.className,
    );
  }

  const { weekdayRow } = state;
  weekdayRow.props.className = clsx(calendarDayGridClassNames.weekdayRow, weekdayRow.props.className);
  if (weekdayRow.weekNumberSpacer) {
    // The spacer cell sits in the same grid column as the week number cells, so it shares day cell metrics.
    weekdayRow.weekNumberSpacer.className = clsx(calendarDayGridClassNames.weekNumberSpacerCell, styles.cellBase);
  }
  for (const cell of weekdayRow.cells) {
    cell.props.className = clsx(
      calendarDayGridClassNames.weekdayCell,
      styles.cellBase,
      styles.weekdayCell,
      cell.props.className,
    );
  }

  for (const week of state.weeks) {
    week.props.className = clsx(
      calendarDayGridClassNames.weekRow,
      styles.weekRow,
      week.transition && styles[`transition-${week.transition}`],
      week.props.className,
    );
    if (week.weekNumber) {
      week.weekNumber.className = clsx(
        calendarDayGridClassNames.weekNumberCell,
        styles.weekNumberCell,
        week.weekNumber.className,
      );
    }
    for (const day of week.days) {
      // Consumer cell props from getDayCellProps extend the cell rather than replacing its class names.
      day.props.className = clsx(
        calendarDayGridClassNames.dayCell,
        styles.cellBase,
        styles.cellBaseFocusIndicator,
        styles.cornerBorderAndRadiusCorners,
        day.isSelected && !day.isSingleSelected && styles.selected,
        day.isSingleSelected && styles.singleSelected,
        !day.isInBounds && styles.outsideBounds,
        !day.isSelected &&
          !day.isInMonth &&
          lightenDaysOutsideNavigatedMonth &&
          styles.outsideNavigatedMonthLightenDaysOutsideNavigatedMonth,
        day.props.className,
      );
      day.button.className = clsx(
        calendarDayGridClassNames.dayButton,
        styles.button,
        day.isToday && styles.today,
        day.button.className,
      );
      day.label.className = clsx(
        calendarDayGridClassNames.dayLabel,
        day.isToday && styles.todayMarker,
        day.label.className,
      );
      if (day.marker) {
        day.marker.className = clsx(calendarDayGridClassNames.marker, styles.marker, day.marker.className);
      }
    }
  }

  return state;
};
