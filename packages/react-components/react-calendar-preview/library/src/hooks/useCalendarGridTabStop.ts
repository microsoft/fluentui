'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { getCalendarGridCell, getCalendarGridCells, isCalendarCellFocusable } from '../utils/calendarKeyboard';

/**
 * Keeps a single roving tab stop in a calendar grid without a focus management runtime.
 *
 * Cells render the navigated cell with `tabIndex={0}` and every other cell with `tabIndex={-1}`. The last focused
 * cell then takes over as the tab stop, so Tab leaves the grid and returning focuses the cell the user left, until
 * that cell is removed, hidden or becomes unavailable.
 *
 * @param allFocusable - whether unavailable cells can hold the tab stop
 * @param getNavigatedCell - resolves the cell rendered as the tab stop, restored when the remembered cell is lost
 * @internal
 */
export function useCalendarGridTabStop<T extends HTMLElement = HTMLDivElement>(
  allFocusable: boolean,
  getNavigatedCell: (grid: T) => HTMLElement | null | undefined,
): [React.RefObject<T | null>, React.FocusEventHandler<HTMLElement>] {
  const gridRef = React.useRef<T>(null);
  const tabStopRef = React.useRef<HTMLElement>(null);

  // Cells rendered without a tabIndex, such as unavailable days, stay out of focus entirely.
  const applyTabStop = (grid: HTMLElement, tabStop: HTMLElement | null) => {
    for (const cell of getCalendarGridCells(grid)) {
      if (cell.hasAttribute('tabindex')) {
        cell.tabIndex = cell === tabStop ? 0 : -1;
      }
    }
  };

  // React leaves a DOM tabIndex untouched while its prop is unchanged, so the tab stop is reapplied after each render.
  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    const tabStop = tabStopRef.current;
    if (!grid) {
      return;
    }
    const cells = getCalendarGridCells(grid);
    const canHoldTabStop = (cell: HTMLElement | null | undefined): cell is HTMLElement =>
      !!cell && cells.includes(cell) && cell.hasAttribute('tabindex') && isCalendarCellFocusable(cell, allFocusable);
    if (canHoldTabStop(tabStop)) {
      applyTabStop(grid, tabStop);
    } else {
      const navigatedCell = getNavigatedCell(grid);
      const nextTabStop = canHoldTabStop(navigatedCell) ? navigatedCell : cells.find(canHoldTabStop);
      // A hidden panel may be revealed without rerendering this picker. Keep its existing stop until then.
      if (nextTabStop) {
        tabStopRef.current = null;
        applyTabStop(grid, nextTabStop);
      }
    }
  });

  const onFocus = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    const cell = getCalendarGridCell(event);
    if (cell) {
      tabStopRef.current = cell;
      applyTabStop(event.currentTarget, cell);
    }
  });

  return [gridRef, onFocus];
}
