'use client';

import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Enter, Home } from '@fluentui/keyboard-keys';
import { isHTMLElement, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { SlotShorthandValue, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils';

type GridSlotProps = ExtractSlotProps<Slot<'div'>>;

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

/** Whether the event is an unmodified arrow key owned by the grid. */
export const isCalendarGridArrow = (
  event: Pick<React.KeyboardEvent, 'key' | 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>,
): boolean =>
  (event.key === ArrowDown || event.key === ArrowLeft || event.key === ArrowRight || event.key === ArrowUp) &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey;

export const isCalendarGridNavigation = (
  event: Pick<React.KeyboardEvent, 'key' | 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>,
): boolean =>
  isCalendarGridArrow(event) ||
  ((event.key === Home || event.key === End) && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey);

/** Remembers focus without moving it when the navigation date or available cells change. */
export function useCalendarRovingFocus<T extends string | number>(
  initialKey: T | undefined,
  focusableKeys: T[],
  scopeKey?: number,
): [T | undefined, (key: T) => void] {
  const [focused, setFocused] = React.useState({ initialKey, scopeKey, key: initialKey });
  const activeKey =
    focused.initialKey === initialKey &&
    focused.scopeKey === scopeKey &&
    focused.key !== undefined &&
    focusableKeys.includes(focused.key)
      ? focused.key
      : initialKey !== undefined && focusableKeys.includes(initialKey)
      ? initialKey
      : focusableKeys[0];
  return [
    activeKey,
    key => {
      if (key !== activeKey) {
        setFocused({ initialKey, scopeKey, key });
      }
    },
  ];
}

/** Finds an eligible month/year destination without wrapping across row or grid boundaries. */
export const getCalendarGridTarget = (
  index: number,
  key: string,
  dir: 'ltr' | 'rtl',
  columns: 3 | 4,
  isFocusable: (index: number) => boolean,
): number | undefined => {
  const count = 12;
  let step: number;
  let start: number;
  let end: number;
  if (key === Home || key === End) {
    step = key === Home ? 1 : -1;
    start = key === Home ? 0 : count - 1;
    end = key === Home ? count : -1;
  } else if (key === ArrowUp || key === ArrowDown) {
    step = key === ArrowUp ? -columns : columns;
    start = index + step;
    end = step > 0 ? count : -1;
  } else {
    step = (key === ArrowRight) !== (dir === 'rtl') ? 1 : -1;
    start = index + step;
    const rowStart = Math.floor(index / columns) * columns;
    end = step > 0 ? rowStart + columns : rowStart - 1;
  }
  for (let candidate = start; candidate >= 0 && candidate < count && candidate !== end; candidate += step) {
    if (isFocusable(candidate)) {
      return candidate;
    }
  }
  return undefined;
};

/**
 * Resolves selection, spatial navigation and roving focus for the month and year grids.
 *
 * @param grid - the consumer `grid` slot props
 * @param ariaLabel - the accessible name of the grid
 * @param isAvailable - whether the cell at an index can be selected
 * @param onSelect - selects the cell at an index
 * @param initialIndex - initial focus target
 * @param allFocusable - whether unavailable cells can receive focus
 * @param scopeKey - displayed year or year-range start
 * @param columns - number of columns in the grid
 * @returns the grid slot, cell lookup and current Tab-stop index
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
  initialIndex: number | undefined,
  allFocusable: boolean,
  scopeKey: number,
  columns: 3 | 4,
): [GridSlotProps, (index: number) => HTMLElement | undefined, number | undefined] {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const { dir } = useFluent_unstable();
  const [activeIndex, setActiveIndex] = useCalendarRovingFocus(
    initialIndex,
    Array.from({ length: 12 }, (_, index) => index).filter(index => allFocusable || isAvailable(index)),
    scopeKey,
  );
  const getCell = (index: number) => (gridRef.current ? getCalendarGridCells(gridRef.current)[index] : undefined);

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
    defaultProps: { 'aria-label': ariaLabel, role: 'grid' },
    elementType: 'div',
  });
  gridSlot.ref = useMergedRefs(gridSlot.ref, gridRef);
  gridSlot.onFocus = mergeCallbacks(gridSlot.onFocus, (event: React.FocusEvent<HTMLElement>) => {
    const [cell, index] = getEventIndex(event);
    if (cell && index >= 0 && (allFocusable || isAvailable(index))) {
      setActiveIndex(index);
    }
  });
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
    } else if (isCalendarGridNavigation(event)) {
      const cells = getCalendarGridCells(event.currentTarget);
      const target = getCalendarGridTarget(
        index,
        event.key,
        dir,
        columns,
        candidate => (allFocusable || isAvailable(candidate)) && !!cells[candidate]?.matches('button:not(:disabled)'),
      );
      event.preventDefault();
      if (target !== undefined) {
        cells[target]?.focus();
      }
    }
  });

  return [gridSlot, getCell, activeIndex];
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
): React.ComponentProps<'button'> => {
  const props = {
    type: 'button' as const,
    role: 'gridcell',
    disabled: isDisabled && !allFocusable,
    'aria-disabled': isDisabled,
    'aria-selected': isSelected,
    tabIndex: isTabStop && (allFocusable || !isDisabled) ? 0 : -1,
    'data-current': toDataAttributeValue(isCurrent),
    'data-selected': toDataAttributeValue(isSelected),
    'data-outside-bounds': toDataAttributeValue(isDisabled),
  };
  return props;
};
