'use client';

import type * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector } from '@fluentui/react-context-selector';
import type { EventHandler } from '@fluentui/react-utilities';
import type { DayCorners, WeekCorners } from '../hooks/useWeekCorners';
import type { DayInfo } from '../hooks/useWeeks';
import type { CalendarDayNavigateData } from '../CalendarDay';

/**
 * Resolved configuration and grid data shared with every row and cell in the day grid.
 */
export type CalendarDayContextValue = {
  /**
   * ID of the current active day cell.
   */
  activeDescendantId: string;

  /**
   * Calculates a day's selection corner radii from its adjacent cells.
   */
  calculateRoundedCorners: (above: boolean, below: boolean, left: boolean, right: boolean) => DayCorners;

  /**
   * How many days a single click selects when `dateRangeType` is `day`.
   */
  daysToSelectInDayView?: number;

  /**
   * Gets the day grid items selected with a given day.
   */
  getDayInfosInRangeOfDay: (dayToCompare: DayInfo) => DayInfo[];

  /**
   * Gets cell references for the supplied day grid items.
   */
  getRefsFromDayInfos: (dayInfosInRange: DayInfo[]) => (HTMLElement | null)[];

  /**
   * Whether days outside the displayed month use reduced emphasis.
   */
  lightenDaysOutsideNavigatedMonth: boolean;

  /**
   * The date currently displayed in the day grid.
   */
  navigatedDate: Date;

  /**
   * Reference to the cell for the displayed date.
   */
  navigatedDayRef: React.RefObject<HTMLTableCellElement | null>;

  /**
   * Handles navigation to a different date.
   */
  onNavigateDate: EventHandler<CalendarDayNavigateData>;

  /**
   * Selection corner data for each day in the grid.
   */
  weekCorners: WeekCorners;

  /**
   * The full grid, including the leading and trailing transition weeks.
   */
  weeks: DayInfo[][];

  /**
   * The number of weeks displayed in the day grid.
   */
  weeksToShow?: number;
};

/**
 * Context values provided by CalendarDay.
 */
export type CalendarDayContextValues = {
  /**
   * Shared CalendarDay configuration and grid data.
   */
  calendarDay: CalendarDayContextValue;
};

const calendarDayContext = createContext<CalendarDayContextValue | undefined>(undefined);

export const CalendarDayProvider = calendarDayContext.Provider;

export const useCalendarDayContext_unstable = <T>(selector: ContextSelector<CalendarDayContextValue, T>): T =>
  useContextSelector(calendarDayContext, ctx => {
    if (!ctx) {
      throw new Error('CalendarDay rows and cells must be rendered inside a CalendarDay.');
    }

    return selector(ctx);
  });
