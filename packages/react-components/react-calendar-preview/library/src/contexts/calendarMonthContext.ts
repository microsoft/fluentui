'use client';

import type * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector } from '@fluentui/react-context-selector';

/**
 * One month cell in the grid.
 */
export type CalendarMonthCell = {
  /**
   * Index of the month within the year, matching `Date.prototype.getMonth()`.
   */
  index: number;
  /**
   * Visible month name.
   */
  label: string;
  /**
   * Accessible month name.
   */
  ariaLabel: string;
  /**
   * Whether this is the displayed month.
   */
  isNavigated: boolean;
  /**
   * Whether this is the current month.
   */
  isCurrent: boolean;
  /**
   * Whether this is the selected month.
   */
  isSelected: boolean;
  /**
   * Whether this month can be selected.
   */
  isInBounds: boolean;
  /**
   * Handles selecting this month.
   */
  onSelect: (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
};

/**
 * Resolved configuration and grid data shared with every row in the month grid.
 */
export type CalendarMonthContextValue = {
  /**
   * The year the grid is showing, used to replay the row motions on navigation.
   */
  navigatedYear: number;

  /**
   * Month cells grouped into rows of four.
   */
  monthRows: CalendarMonthCell[][];

  /**
   * Reference to the displayed month button.
   */
  navigatedMonthRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Context values provided by CalendarMonth.
 */
export type CalendarMonthContextValues = {
  /**
   * Shared CalendarMonth configuration and grid data.
   */
  calendarMonth: CalendarMonthContextValue;
};

const calendarMonthContext = createContext<CalendarMonthContextValue | undefined>(undefined);

export const CalendarMonthProvider = calendarMonthContext.Provider;

export const useCalendarMonthContext_unstable = <T>(selector: ContextSelector<CalendarMonthContextValue, T>): T =>
  useContextSelector(calendarMonthContext, ctx => {
    if (!ctx) {
      throw new Error('CalendarMonth rows must be rendered inside a CalendarMonth.');
    }

    return selector(ctx);
  });
