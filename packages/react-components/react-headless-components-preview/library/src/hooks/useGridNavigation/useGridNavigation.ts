'use client';

import type * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { mergeCallbacks, useEventCallback } from '@fluentui/react-utilities';

/**
 * Options for {@link useGridNavigation}.
 */
export type UseGridNavigationOptions<TRoot extends HTMLElement> = {
  /**
   * Whether arrow-key navigation wraps at the first and last row or cell.
   *
   * @default false
   */
  circular?: boolean;

  /**
   * Selector used to find cells within each row and to resolve the cell targeted by an event.
   *
   * @default '[role="gridcell"]'
   */
  cellSelector?: string;

  /**
   * Whether Home and End move to the first and last enabled cell in the current row.
   * Ctrl+Home and Ctrl+End move to the first and last enabled cell in the grid.
   *
   * @default false
   */
  homeEndNavigation?: boolean;

  /**
   * Determines whether a cell can receive focus during arrow-key navigation.
   * By default, cells with `disabled` or `aria-disabled="true"` are skipped.
   */
  isCellFocusable?: (cell: HTMLElement) => boolean;

  /**
   * Existing focus handler to call before updating the grid's roving tab stops.
   */
  onFocus?: React.FocusEventHandler<TRoot>;

  /**
   * Existing keyboard handler to call before handling arrow-key navigation.
   * Calling `event.preventDefault()` prevents the grid navigation handler from moving focus.
   */
  onKeyDown?: React.KeyboardEventHandler<TRoot>;

  /**
   * Selector used to find rows within the grid root.
   *
   * @default '[role="row"]'
   */
  rowSelector?: string;
};

/**
 * Event handlers returned by {@link useGridNavigation} for the grid root element.
 */
export type GridNavigationProps<TRoot extends HTMLElement> = Pick<React.HTMLAttributes<TRoot>, 'onFocus' | 'onKeyDown'>;

const defaultIsCellFocusable = (cell: HTMLElement) =>
  !cell.hasAttribute('disabled') && cell.getAttribute('aria-disabled') !== 'true';

const getGridCells = (root: HTMLElement, rowSelector: string, cellSelector: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(rowSelector), row =>
    Array.from(row.querySelectorAll<HTMLElement>(cellSelector)),
  );

const getNextIndex = (index: number, direction: number, length: number, circular: boolean) => {
  const nextIndex = index + direction;
  if (nextIndex >= 0 && nextIndex < length) {
    return nextIndex;
  }

  return circular ? (nextIndex + length) % length : -1;
};

const findEnabledCell = (cells: HTMLElement[], isCellFocusable: (cell: HTMLElement) => boolean, fromEnd = false) => {
  const direction = fromEnd ? -1 : 1;
  let index = fromEnd ? cells.length - 1 : 0;

  while (index >= 0 && index < cells.length) {
    if (isCellFocusable(cells[index])) {
      return cells[index];
    }
    index += direction;
  }

  return undefined;
};

/**
 * Provides roving tab stops and two-dimensional arrow-key navigation for a semantic grid.
 *
 * The grid root must contain row elements, and each row must contain focusable cell elements.
 * By default, rows are identified by `role="row"` and cells by `role="gridcell"`; custom
 * selectors can be supplied when equivalent semantics use different markup.
 *
 * Left and Right move through cells in DOM order, including across row boundaries. Up and Down
 * preserve the current column while moving between rows. Disabled cells are skipped, and focus
 * movement updates `tabindex` so the most recently focused cell remains the grid's tab stop.
 * When enabled, Home and End move to row boundaries, while Ctrl+Home and Ctrl+End move to grid
 * boundaries. In right-to-left mode, the meanings of Left and Right are reversed.
 *
 * Apply the returned `onFocus` and `onKeyDown` handlers to the grid root element.
 *
 * @param options - Grid structure, navigation behavior, and existing root event handlers.
 * @returns Event handlers to apply to the grid root.
 */
export const useGridNavigation = <TRoot extends HTMLElement>(
  options: UseGridNavigationOptions<TRoot>,
): GridNavigationProps<TRoot> => {
  const {
    cellSelector = '[role="gridcell"]',
    circular = false,
    homeEndNavigation = false,
    isCellFocusable = defaultIsCellFocusable,
    onFocus,
    onKeyDown,
    rowSelector = '[role="row"]',
  } = options;

  const { dir } = useFluent();

  const handleFocus = useEventCallback(
    mergeCallbacks(onFocus, (event: React.FocusEvent<TRoot>) => {
      const focusedCell = (event.target as HTMLElement).closest<HTMLElement>(cellSelector);
      if (!focusedCell || !event.currentTarget.contains(focusedCell)) {
        return;
      }

      for (const cell of getGridCells(event.currentTarget, rowSelector, cellSelector).flat()) {
        cell.tabIndex = cell === focusedCell && isCellFocusable(cell) ? 0 : -1;
      }
    }),
  );

  const handleKeyDown = useEventCallback(
    mergeCallbacks(onKeyDown, (event: React.KeyboardEvent<TRoot>) => {
      const navigationKeys = homeEndNavigation
        ? ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home']
        : ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];

      if (event.defaultPrevented || !navigationKeys.includes(event.key)) {
        return;
      }

      const currentCell = (event.target as HTMLElement).closest<HTMLElement>(cellSelector);
      if (!currentCell || !event.currentTarget.contains(currentCell)) {
        return;
      }

      const rows = getGridCells(event.currentTarget, rowSelector, cellSelector);
      const rowIndex = rows.findIndex(row => row.includes(currentCell));
      const columnIndex = rows[rowIndex]?.indexOf(currentCell) ?? -1;
      let nextCell: HTMLElement | undefined;

      if (event.key === 'Home' || event.key === 'End') {
        const cells = event.ctrlKey ? rows.flat() : rows[rowIndex];
        nextCell = findEnabledCell(cells, isCellFocusable, event.key === 'End');
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const cells = rows.flat();
        const inlineDirection = event.key === 'ArrowRight' ? 1 : -1;
        const navigationDirection = dir === 'rtl' ? -inlineDirection : inlineDirection;
        let index = cells.indexOf(currentCell);

        for (let offset = 0; offset < cells.length - 1; offset++) {
          index = getNextIndex(index, navigationDirection, cells.length, circular);
          if (index === -1) {
            break;
          }
          if (isCellFocusable(cells[index])) {
            nextCell = cells[index];
            break;
          }
        }
      } else {
        const blockDirection = event.key === 'ArrowDown' ? 1 : -1;
        let index = rowIndex;

        for (let offset = 0; offset < rows.length - 1; offset++) {
          index = getNextIndex(index, blockDirection, rows.length, circular);
          if (index === -1) {
            break;
          }
          const targetCell = rows[index][columnIndex];
          if (targetCell && isCellFocusable(targetCell)) {
            nextCell = targetCell;
            break;
          }
        }
      }

      if (nextCell) {
        event.preventDefault();
        currentCell.tabIndex = -1;
        nextCell.tabIndex = 0;
        nextCell.focus();
      }
    }),
  );

  return { onFocus: handleFocus, onKeyDown: handleKeyDown };
};
