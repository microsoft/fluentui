'use client';

import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import { formatDateTime as defaultFormatDateTime, formatLabel as defaultFormatLabel } from '../utils';
import type { ContextSelector } from '@fluentui/react-context-selector';
import type { EventHandler } from '@fluentui/react-utilities';
import type { DateRangeType, DayOfWeek, FirstWeekOfYear, FormatCalendarLabel, FormatDateTime } from '../utils';
import type { CalendarDaySelectData } from '../CalendarDay';

/**
 * Configuration shared by the Calendar root, every picker below it, and every grid row and cell.
 * Pickers and their descendants read shared configuration directly from this context.
 */
export type CalendarContextValue = {
  /**
   * Allows all dates and buttons to be focused, including disabled ones.
   */
  allFocusable: boolean;

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
   * Formats dates displayed by the calendar.
   */
  formatDateTime: FormatDateTime;

  /**
   * Formats calendar accessibility labels.
   */
  formatLabel: FormatCalendarLabel;

  /**
   * Whether the month and year grids highlight the current month/year.
   */
  highlightCurrent: boolean;

  /**
   * Whether the month and year grids highlight the selected month/year.
   */
  highlightSelected: boolean;

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
   * Value of today. When unset, consumers fall back to the current time on the client machine.
   */
  today?: Date;

  /**
   * The currently selected date.
   */
  value?: Date;

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
 * Used when a picker or grid is rendered without a Calendar above it.
 */
export const calendarContextDefaultValue: CalendarContextValue = {
  allFocusable: false,
  dateRangeType: 'day',
  firstDayOfWeek: 'sunday',
  firstWeekOfYear: 'firstDay',
  formatDateTime: defaultFormatDateTime,
  formatLabel: defaultFormatLabel,
  highlightCurrent: false,
  highlightSelected: false,
  showWeekNumbers: false,
};

const calendarContext = createContext<CalendarContextValue | undefined>(undefined);

export const CalendarProvider = calendarContext.Provider;

export const useCalendarContext_unstable = <T>(selector: ContextSelector<CalendarContextValue, T>): T =>
  useContextSelector(calendarContext, (ctx = calendarContextDefaultValue) => selector(ctx));
