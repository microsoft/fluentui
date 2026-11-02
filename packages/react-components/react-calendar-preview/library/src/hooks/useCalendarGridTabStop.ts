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
 * Panel visibility is isolated at the grid boundary; styles targeting cells directly remain cell-local hiding.
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
    const canHoldTabStop = (
      cell: HTMLElement | null | undefined,
      visibilityBoundary?: HTMLElement,
    ): cell is HTMLElement =>
      !!cell &&
      cells.includes(cell) &&
      cell.hasAttribute('tabindex') &&
      isCalendarCellFocusable(cell, allFocusable, visibilityBoundary);
    if (canHoldTabStop(tabStop)) {
      applyTabStop(grid, tabStop);
    } else {
      const navigatedCell = getNavigatedCell(grid);
      const nextTabStop = canHoldTabStop(navigatedCell) ? navigatedCell : cells.find(cell => canHoldTabStop(cell));
      if (nextTabStop) {
        tabStopRef.current = null;
        applyTabStop(grid, nextTabStop);
      } else {
        const visibility = grid.style.getPropertyValue('visibility');
        const priority = grid.style.getPropertyPriority('visibility');
        // Isolate inherited panel visibility synchronously; cell-local hiding must still exclude a logical stop.
        grid.style.setProperty('visibility', 'visible', 'important');
        try {
          const hiddenTabStop = canHoldTabStop(tabStop, grid)
            ? tabStop
            : canHoldTabStop(navigatedCell, grid)
            ? navigatedCell
            : cells.find(cell => canHoldTabStop(cell, grid));
          tabStopRef.current = hiddenTabStop === tabStop ? tabStop : null;
          applyTabStop(grid, hiddenTabStop ?? null);
        } finally {
          if (visibility) {
            grid.style.setProperty('visibility', visibility, priority);
          } else {
            grid.style.removeProperty('visibility');
          }
        }
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
