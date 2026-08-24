'use client';

import type * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector } from '@fluentui/react-context-selector';
import type { EventHandler } from '@fluentui/react-utilities';
import type { CalendarYearSelectData } from '../CalendarYear';

/**
 * One year cell in the grid.
 */
export type CalendarYearCell = {
  /**
   * Four-digit year represented by the cell.
   */
  year: number;
  /**
   * Visible cell content.
   */
  content: React.ReactNode;
  /**
   * Whether this is the current year.
   */
  isCurrent: boolean;
  /**
   * Whether this is the selected year.
   */
  isSelected: boolean;
  /**
   * Whether this year cannot be selected.
   */
  isDisabled: boolean;
};

/**
 * Resolved configuration and grid data shared with every row in the year grid.
 */
export type CalendarYearContextValue = {
  /**
   * The first year displayed in the grid.
   */
  fromYear: number;

  /**
   * Reference to the current year button.
   */
  currentYearRef: React.RefObject<HTMLButtonElement | null>;

  /**
   * Handles selecting a year.
   */
  onSelectYear?: EventHandler<CalendarYearSelectData>;

  /**
   * Reference to the selected year button.
   */
  selectedYearRef: React.RefObject<HTMLButtonElement | null>;

  /**
   * Year cells grouped into rows of four.
   */
  yearRows: CalendarYearCell[][];
};

/**
 * Context values provided by CalendarYear.
 */
export type CalendarYearContextValues = {
  /**
   * Shared CalendarYear configuration and grid data.
   */
  calendarYear: CalendarYearContextValue;
};

const calendarYearContext = createContext<CalendarYearContextValue | undefined>(undefined);

export const CalendarYearProvider = calendarYearContext.Provider;

export const useCalendarYearContext_unstable = <T>(selector: ContextSelector<CalendarYearContextValue, T>): T =>
  useContextSelector(calendarYearContext, ctx => {
    if (!ctx) {
      throw new Error('CalendarYear rows must be rendered inside a CalendarYear.');
    }

    return selector(ctx);
  });
