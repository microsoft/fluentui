'use client';

import * as React from 'react';
import { calendarFormatters } from './utils';
import type { EventHandler } from '@fluentui/react-utilities';
import type { CalendarState } from './Calendar.types';
import type { CalendarFormatters, DateRangeType, DayOfWeek, FirstWeekOfYear } from './utils';
import type { CalendarDaySelectData } from './CalendarDay/CalendarDay.types';

/**
 * Configuration shared by the Calendar root, every picker below it, and every grid row and cell.
 * Pickers and their descendants read shared configuration directly from this context.
 */
export type CalendarContextValue = {
  /**
   * Allows all dates and buttons to be focused, including disabled ones.
   */
  allFocusable: boolean;

  /** Number of columns in the month picker. */
  calendarMonthColumns: 3 | 4;

  /** Number of columns in the year picker. */
  calendarYearColumns: 3 | 4;

  /**
   * The range selected when a date is chosen.
   */
  dateRangeType: DateRangeType;

  /**
   * The first day of the displayed week.
   */
  firstDayOfWeek: DayOfWeek;

  /**
   * The rule used to determine the first week of a year.
   */
  firstWeekOfYear: FirstWeekOfYear;

  /**
   * Formats dates and accessibility labels displayed by the calendar.
   */
  formatters: CalendarFormatters;

  /**
   * The latest selectable or navigable date.
   */
  maxDate?: Date;

  /**
   * The earliest selectable or navigable date.
   */
  minDate?: Date;

  /**
   * Dates that cannot be selected.
   */
  restrictedDates?: Date[];

  /**
   * Selects a date. Fired by the day grid once the date range has been resolved.
   */
  setValue?: EventHandler<CalendarDaySelectData>;

  /**
   * Whether week numbers appear before each week row.
   */
  showWeekNumbers: boolean;

  /**
   * Value of today. Pass explicitly while server rendering to keep server and client output consistent.
   */
  today?: Date;

  /**
   * The currently selected date.
   */
  value?: Date | null;

  /**
   * Days included in a work-week selection.
   */
  workWeekDays?: DayOfWeek[];
};

/**
 * Context values provided by Calendar.
 */
export type CalendarContextValues = {
  /**
   * Shared Calendar configuration.
   */
  calendar: CalendarContextValue;
};

/**
 * Default shared configuration used when a picker or grid is rendered without a Calendar above it.
 */
export const calendarContextDefaultValue: CalendarContextValue = {
  allFocusable: false,
  calendarMonthColumns: 4,
  calendarYearColumns: 4,
  dateRangeType: 'day',
  firstDayOfWeek: 'sunday',
  firstWeekOfYear: 'firstDay',
  formatters: calendarFormatters,
  showWeekNumbers: false,
};

const calendarContext = React.createContext<CalendarContextValue | undefined>(undefined);

/** Provides shared configuration to standalone Calendar pickers and grids. */
export const CalendarProvider = calendarContext.Provider;

/** Reads shared Calendar configuration from the nearest CalendarProvider, or standalone defaults. */
export const useCalendarContext = (): CalendarContextValue =>
  React.useContext(calendarContext) ?? calendarContextDefaultValue;

/**
 * Creates state for the CalendarContextValues component.
 */
export function useCalendarContextValues(state: CalendarState): CalendarContextValues {
  const {
    allFocusable,
    calendarMonthColumns,
    calendarYearColumns,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatters,
    maxDate,
    minDate,
    restrictedDates,
    setValue,
    showWeekNumbers,
    today,
    value,
    workWeekDays,
  } = state;

  const calendar = React.useMemo<CalendarContextValue>(
    () => ({
      allFocusable,
      calendarMonthColumns,
      calendarYearColumns,
      dateRangeType,
      firstDayOfWeek,
      firstWeekOfYear,
      formatters,
      maxDate,
      minDate,
      restrictedDates,
      setValue,
      showWeekNumbers,
      today,
      value,
      workWeekDays,
    }),
    [
      allFocusable,
      calendarMonthColumns,
      calendarYearColumns,
      dateRangeType,
      firstDayOfWeek,
      firstWeekOfYear,
      formatters,
      maxDate,
      minDate,
      restrictedDates,
      setValue,
      showWeekNumbers,
      today,
      value,
      workWeekDays,
    ],
  );

  return { calendar };
}
