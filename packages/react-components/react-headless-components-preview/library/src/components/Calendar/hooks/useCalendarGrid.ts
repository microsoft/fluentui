'use client';

import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Enter, Home, Space } from '@fluentui/keyboard-keys';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getRTLSafeKey,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { SlotShorthandValue, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils';

type GridSlotProps = ExtractSlotProps<Slot<'div'>> & {
  'data-fui-calendar-grid'?: string;
};
type GridCellRootProps = React.ComponentProps<'div'> & {
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

/** Month and year grids always show twelve cells. */
const PICKER_CELL_COUNT = 12;

/** Whether a key event is an unmodified arrow, Home or End key that a calendar grid moves focus with. */
export const isCalendarGridNavigationKey = (event: React.KeyboardEvent): boolean =>
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey &&
  (event.key === ArrowDown ||
    event.key === ArrowLeft ||
    event.key === ArrowRight ||
    event.key === ArrowUp ||
    event.key === Home ||
    event.key === End);

/**
 * Finds the cell that an arrow, Home or End key moves to in a grid of `columns` columns, skipping ineligible cells.
 * Vertical arrows keep the column. Without `wrapRows`, as in the month and year grids, horizontal arrows stay within the
 * row and Home/End reach the first/last eligible cell of the grid. With `wrapRows`, as in the day grid, horizontal
 * arrows continue into the adjacent week and Home/End stay within the week.
 *
 * @returns the target index, or `undefined` when no eligible cell lies in that direction
 * @internal
 */
export const getCalendarGridTargetIndex = (
  key: string,
  dir: 'ltr' | 'rtl',
  index: number,
  count: number,
  columns: number,
  isEligible: (index: number) => boolean,
  wrapRows = false,
): number | undefined => {
  if (key === Home || key === End) {
    const rowStart = wrapRows ? index - (index % columns) : 0;
    const rowEnd = wrapRows ? Math.min(rowStart + columns, count) - 1 : count - 1;
    // Home and End reach the first or last eligible cell in the grid (or row for the day grid).
    const [from, to, step] = key === Home ? [rowStart, rowEnd, 1] : [rowEnd, rowStart, -1];
    for (let candidate = from; candidate !== to + step; candidate += step) {
      if (isEligible(candidate)) {
        return candidate;
      }
    }
    return undefined;
  }

  let step: number;
  if (key === ArrowDown) {
    step = columns;
  } else if (key === ArrowUp) {
    step = -columns;
  } else if (key === getRTLSafeKey(ArrowRight, dir)) {
    step = 1;
  } else if (key === getRTLSafeKey(ArrowLeft, dir)) {
    step = -1;
  } else {
    return undefined;
  }

  const row = Math.floor(index / columns);
  for (let candidate = index + step; candidate >= 0 && candidate < count; candidate += step) {
    if (!wrapRows && Math.abs(step) === 1 && Math.floor(candidate / columns) !== row) {
      return undefined;
    }
    if (isEligible(candidate)) {
      return candidate;
    }
  }
  return undefined;
};

/**
 * Adds a roving tab stop, arrow, Home and End navigation, and delegated activation to the month and year grids.
 * Only the tab-stop cell has `tabIndex={0}`. Moving focus updates the tab stop without selecting or navigating, and the
 * last focused cell stays the tab stop until `resetKey` changes, such as when the grid's cells or columns change.
 *
 * @param grid - the consumer `grid` slot props
 * @param ariaLabel - the accessible name of the grid
 * @param isAvailable - whether the cell at an index can be selected
 * @param onSelect - selects the cell at an index
 * @param options - the column count, whether unavailable cells are focusable, the default tab stop and its reset key
 * @returns the grid slot, the cell lookup and the index of the tab-stop cell
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
  options: { columns: number; allFocusable: boolean; defaultTabStop: number | undefined; resetKey: string },
): [GridSlotProps, (index: number) => HTMLElement | undefined, number | undefined, number | undefined] {
  const { columns, allFocusable, defaultTabStop, resetKey } = options;
  const { dir } = useFluent();
  const gridRef = React.useRef<HTMLDivElement>(null);
  const getCell = (index: number) => (gridRef.current ? getCalendarGridCells(gridRef.current)[index] : undefined);
  const isEligible = (index: number) => index >= 0 && index < PICKER_CELL_COUNT && (allFocusable || isAvailable(index));

  // The focused cell keeps the tab stop until the grid shows different cells.
  const [activeCell, setActiveCell] = React.useState<{ index: number; resetKey: string } | undefined>(undefined);
  const tabStop =
    activeCell && activeCell.resetKey === resetKey && activeCell.index >= 0 && activeCell.index < PICKER_CELL_COUNT
      ? activeCell.index
      : defaultTabStop !== undefined && isEligible(defaultTabStop)
      ? defaultTabStop
      : undefined;

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
      'data-fui-calendar-grid': '',
    },
    elementType: 'div',
  }) as GridSlotProps;
  gridSlot.ref = useMergedRefs(gridSlot.ref, gridRef);
  gridSlot.onFocus = mergeCallbacks(gridSlot.onFocus, (event: React.FocusEvent<HTMLElement>) => {
    const [cell, index] = getEventIndex(event);
    if (cell && event.target === cell && isEligible(index)) {
      setActiveCell({ index, resetKey });
    }
  });
  gridSlot.onClick = mergeCallbacks(gridSlot.onClick, (event: React.MouseEvent<HTMLElement>) => {
    const [cell, index] = getEventIndex(event);
    if (cell && index >= 0 && !event.isDefaultPrevented() && isAvailable(index)) {
      selectCell(event, cell, index);
    }
  });
  // Reads the grid element to move focus, so it runs as an event callback.
  const onGridKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }
    // Keys from content inside the cell, including its button, keep their native behavior.
    const [cell, index] = getEventIndex(event);
    if (!cell || index < 0 || event.target !== cell) {
      return;
    }

    if (isCalendarGridNavigationKey(event)) {
      // Boundary keys are owned too, so the page does not scroll when focus cannot move further.
      event.preventDefault();
      const targetIndex = getCalendarGridTargetIndex(event.key, dir, index, PICKER_CELL_COUNT, columns, isEligible);
      if (targetIndex !== undefined) {
        setActiveCell({ index: targetIndex, resetKey });
        getCell(targetIndex)?.focus();
      }
      return;
    }

    if ((event.key === Enter || event.key === Space) && isAvailable(index)) {
      selectCell(event, cell, index);
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  });
  gridSlot.onKeyDown = mergeCallbacks(gridSlot.onKeyDown, onGridKeyDown);

  return [gridSlot, getCell, tabStop, activeCell?.index];
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
  isActive: boolean,
): GridCellProps => {
  return {
    root: {
      role: 'gridcell',
      'aria-disabled': isDisabled,
      'aria-selected': isSelected,
      'aria-current': isCurrent ? 'date' : undefined,
      // Keep the last focused cell programmatically focusable if the grid changes while it is focused.
      tabIndex: isTabStop ? 0 : allFocusable || !isDisabled || isActive ? -1 : undefined,
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
