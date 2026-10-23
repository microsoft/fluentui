'use client';

import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { isHTMLElement, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { SlotShorthandValue, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils';

type GridSlotProps = ExtractSlotProps<Slot<'div'>> & {
  focusgroup?: string;
  'data-fui-calendar-grid'?: string;
};
type GridCellRootProps = React.ComponentProps<'div'> & {
  focusgroupstart?: string;
  'data-current'?: string;
  'data-selected'?: string;
  'data-outside-bounds'?: string;
};
type GridCellProps = {
  root: GridCellRootProps;
  button: React.ComponentProps<'button'>;
};

/**
 * One row of the month or year grid.
 */
export type CalendarGridRow<TCell> = {
  /** Stable key of the row. */
  key: number;
  /** Semantic cells in display order. */
  cells: TCell[];
};

const isElement = (target: EventTarget | null): target is Element => {
  const element = target as Element | null;
  const ElementConstructor = element?.ownerDocument?.defaultView?.Element;
  return !!ElementConstructor && element instanceof ElementConstructor;
};

/** Whether paging keys belong to a nested widget rather than a Calendar-owned grid. */
export const isCalendarKeyboardEventFromNestedWidget = (target: EventTarget | null, root: HTMLElement): boolean => {
  if (!isElement(target)) {
    return false;
  }
  const owner = target.closest('[role="grid"], [role="toolbar"]');
  if (!owner || !root.contains(owner)) {
    return false;
  }
  return owner.getAttribute('role') === 'toolbar' || !owner.hasAttribute('data-fui-calendar-grid');
};

/** Whether content owns text editing rather than grid keyboard navigation. */
export const isCalendarKeyboardEditable = (target: EventTarget | null): boolean => {
  if (!isElement(target)) {
    return false;
  }
  if (target.closest('input, textarea, select')) {
    return true;
  }
  let element: Element | null = target;
  while (element) {
    const contentEditable = element.getAttribute('contenteditable')?.trim().toLowerCase();
    if (contentEditable === '' || contentEditable === 'true' || contentEditable === 'plaintext-only') {
      return true;
    }
    if (contentEditable === 'false') {
      return false;
    }
    element = element.parentElement;
  }
  return false;
};

/** Lists the cells owned by a grid, excluding nested grids. */
const getCalendarGridCells = (grid: Element): HTMLElement[] =>
  Array.from(grid.querySelectorAll<HTMLElement>('[role="gridcell"]')).filter(
    cell => cell.closest('[role="grid"]') === grid,
  );

/**
 * Resolves an event's cell, respecting nested grids, toolbars and editable content.
 * Range-hover events can originate from editable content.
 */
export const getCalendarGridCell = (event: React.SyntheticEvent<HTMLElement>): HTMLElement | undefined => {
  const { currentTarget: grid, target } = event;
  const isRangeHover = event.type === 'mouseover' || event.type === 'mouseout';
  if (!isElement(target) || (!isRangeHover && isCalendarKeyboardEditable(target))) {
    return undefined;
  }
  const cell = target.closest<HTMLElement>('[role="gridcell"]');
  const ownerSelector =
    event.type.startsWith('key') || event.type === 'focus' ? '[role="grid"], [role="toolbar"]' : '[role="grid"]';
  return cell && cell.closest('[role="grid"]') === grid && target.closest(ownerSelector) === grid ? cell : undefined;
};

/**
 * Adds focusgroup navigation and delegated activation to the month and year grids.
 *
 * @param grid - the consumer `grid` slot props
 * @param ariaLabel - the accessible name of the grid
 * @param isAvailable - whether the cell at an index can be selected
 * @param onSelect - selects the cell at an index
 * @returns the grid slot and cell lookup
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
  const getCell = (index: number) => (gridRef.current ? getCalendarGridCells(gridRef.current)[index] : undefined);

  const getEventIndex = (event: React.SyntheticEvent<HTMLElement>) => {
    const cell = getCalendarGridCell(event);
    if (!cell) {
      return [undefined, -1] as const;
    }
    const index = getCalendarGridCells(event.currentTarget).indexOf(cell);
    return [cell, index] as const;
  };

  const selectCell = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    cell: HTMLElement,
    index: number,
  ) => {
    const button = cell.querySelector('button');
    if (!isHTMLElement(button, { constructorName: 'HTMLButtonElement' })) {
      return;
    }
    const gridElement = event.currentTarget;
    try {
      // Preserve the button-event contract while sharing cancellation with the delegated grid event.
      onSelect(Object.assign(event, { currentTarget: button }), index);
    } finally {
      event.currentTarget = gridElement;
    }
  };

  const gridSlot = slot.always(grid, {
    defaultProps: {
      'aria-label': ariaLabel,
      role: 'grid',
      focusgroup: 'grid manual',
      'data-fui-calendar-grid': '',
    },
    elementType: 'div',
  }) as GridSlotProps;
  gridSlot.ref = useMergedRefs(gridSlot.ref, gridRef);
  gridSlot.onClick = mergeCallbacks(gridSlot.onClick, (event: React.MouseEvent<HTMLElement>) => {
    const [cell, index] = getEventIndex(event);
    if (cell && index >= 0 && !event.isDefaultPrevented() && isAvailable(index)) {
      selectCell(event, cell, index);
    }
  });
  gridSlot.onKeyDown = mergeCallbacks(gridSlot.onKeyDown, (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.isDefaultPrevented() || (event.key !== Enter && event.key !== Space)) {
      return;
    }
    const target = event.target;
    const [cell, index] = getEventIndex(event);
    if (!cell || index < 0 || !isAvailable(index) || !isElement(target) || target !== cell) {
      return;
    }
    selectCell(event, cell, index);
    if (!event.isDefaultPrevented()) {
      event.preventDefault();
    }
  });

  return [gridSlot, getCell];
}

/**
 * Groups semantic month or year cells into rows.
 *
 * @param cells - the cells in grid order
 * @param columns - number of columns in each row
 * @internal
 */
export const getCalendarPickerRows = <TCell>(cells: TCell[], columns: 3 | 4): CalendarGridRow<TCell>[] => {
  if (columns !== 3 && columns !== 4) {
    throw new RangeError('Calendar picker columns must be 3 or 4.');
  }
  const rows: CalendarGridRow<TCell>[] = [];
  cells.forEach((cell, index) => {
    const rowIndex = Math.floor(index / columns);
    (rows[rowIndex] ??= { key: rowIndex, cells: [] }).cells.push(cell);
  });
  return rows;
};

/** Resolves the shared button state for a month or year cell. */
export const getCalendarPickerCellProps = (
  allFocusable: boolean,
  isDisabled: boolean,
  isSelected: boolean,
  isCurrent: boolean,
  isTabStop: boolean,
): GridCellProps => {
  return {
    root: {
      role: 'gridcell',
      'aria-disabled': isDisabled,
      'aria-selected': isSelected,
      tabIndex: allFocusable || !isDisabled ? 0 : -1,
      focusgroupstart: isTabStop ? '' : undefined,
      'data-current': toDataAttributeValue(isCurrent),
      'data-selected': toDataAttributeValue(isSelected),
      'data-outside-bounds': toDataAttributeValue(isDisabled),
    },
    button: {
      type: 'button',
      disabled: isDisabled && !allFocusable,
      tabIndex: -1,
    },
  };
};
