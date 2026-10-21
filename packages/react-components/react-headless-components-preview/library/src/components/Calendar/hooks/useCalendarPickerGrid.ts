'use client';

import * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { isHTMLElement, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { SlotShorthandValue, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { stringifyDataAttribute } from '../utils/dataAttributes';
import type { CalendarElementProps, CalendarGridRow } from '../utils/calendarGrid.types';
import { CALENDAR_GRID_COLUMNS, getCalendarGridCell, getCalendarGridCells } from '../utils/calendarKeyboard';

type GridSlotProps = ExtractSlotProps<Slot<'div'>>;

/**
 * Resolves the four-column month and year grids. Focusgroup owns directional navigation and focus memory;
 * Calendar retains selection and imperative focus handles.
 *
 * @param grid - the consumer `grid` slot props
 * @param ariaLabel - the accessible name of the grid
 * @param isAvailable - whether the cell at an index can be selected
 * @param onSelect - selects the cell at an index
 * @returns the resolved grid slot, and a function returning the cell element at an index
 * @internal
 */
export function useCalendarPickerGrid(
  grid: GridSlotProps | SlotShorthandValue | undefined,
  ariaLabel: string,
  isAvailable: (index: number) => boolean,
  onSelect: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => void,
): [GridSlotProps, (index: number) => HTMLElement | undefined] {
  const gridRef = React.useRef<HTMLDivElement>(null);

  const getEventIndex = (event: React.SyntheticEvent<HTMLElement>) => {
    const cell = getCalendarGridCell(event);
    if (!isHTMLElement(cell, { constructorName: 'HTMLButtonElement' })) {
      return [undefined, -1] as const;
    }
    const index = getCalendarGridCells(event.currentTarget).indexOf(cell);
    return [cell, index] as const;
  };

  const selectCell = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    cell: HTMLButtonElement,
    index: number,
  ) => {
    const gridElement = event.currentTarget;
    try {
      // Preserve the button-event contract while sharing cancellation with the delegated grid event.
      onSelect(Object.assign(event, { currentTarget: cell }), index);
    } finally {
      event.currentTarget = gridElement;
    }
  };

  const gridSlot = slot.always(grid, {
    defaultProps: { 'aria-label': ariaLabel, role: 'grid', focusgroup: 'grid manual' },
    elementType: 'div',
  });
  gridSlot.ref = useMergedRefs(gridSlot.ref, gridRef);
  gridSlot.onClick = mergeCallbacks(gridSlot.onClick, (event: React.MouseEvent<HTMLElement>) => {
    const [cell, index] = getEventIndex(event);
    if (cell && index >= 0 && !event.isDefaultPrevented() && isAvailable(index)) {
      selectCell(event, cell, index);
    }
  });
  gridSlot.onKeyDown = mergeCallbacks(gridSlot.onKeyDown, (event: React.KeyboardEvent<HTMLElement>) => {
    const [cell, index] = getEventIndex(event);
    if (!cell || event.isDefaultPrevented()) {
      return;
    }
    if (event.key === Enter && isAvailable(index)) {
      selectCell(event, cell, index);
      event.preventDefault();
    }
  });

  return [gridSlot, index => (gridRef.current ? getCalendarGridCells(gridRef.current)[index] : undefined)];
}

/**
 * Groups month or year cells into rows of four and completes the props of each cell's `button`.
 *
 * @param cells - the cells in grid order
 * @param allFocusable - whether unavailable cells can be focused
 * @param getState - returns whether a cell is disabled, selected, current and navigated
 * @internal
 */
export const getCalendarPickerRows = <
  TCell extends { props: CalendarElementProps<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>> },
>(
  cells: TCell[],
  allFocusable: boolean,
  getState: (cell: TCell) => [isDisabled: boolean, isSelected: boolean, isCurrent: boolean, isNavigated: boolean],
): CalendarGridRow<TCell>[] => {
  const rows: CalendarGridRow<TCell>[] = [];
  cells.forEach((cell, index) => {
    const [isDisabled, isSelected, isCurrent, isNavigated] = getState(cell);
    Object.assign(cell.props, {
      type: 'button',
      role: 'gridcell',
      disabled: isDisabled && !allFocusable,
      'aria-disabled': isDisabled,
      'aria-selected': isSelected,
      tabIndex: 0,
      focusgroupstart: stringifyDataAttribute(isNavigated),
      'data-current': stringifyDataAttribute(isCurrent),
      'data-selected': stringifyDataAttribute(isSelected),
      'data-outside-bounds': stringifyDataAttribute(isDisabled),
    });
    const rowIndex = Math.floor(index / CALENDAR_GRID_COLUMNS);
    (rows[rowIndex] ??= { key: rowIndex, props: { role: 'row', focusgrouprow: '' }, cells: [] }).cells.push(cell);
  });
  return rows;
};
