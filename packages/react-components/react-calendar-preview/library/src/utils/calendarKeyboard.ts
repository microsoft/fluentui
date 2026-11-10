import type * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '@fluentui/keyboard-keys';
import { getRTLSafeKey } from '@fluentui/react-utilities';

export const CALENDAR_GRID_COLUMNS = 4;

const isElement = (target: EventTarget | null): target is Element => {
  const element = target as Element | null;
  const ElementConstructor = element?.ownerDocument?.defaultView?.Element;
  return !!ElementConstructor && element instanceof ElementConstructor;
};

// The grid supplies the focused date while Calendar retains ownership of paging and consumer cancellation.
const navigationDates = new WeakMap<Event, Date>();

export const setCalendarNavigationDate = (event: Event, date: Date): void => {
  navigationDates.set(event, date);
};

export const getCalendarNavigationDate = (event: Event): Date | undefined => {
  const date = navigationDates.get(event);
  navigationDates.delete(event);
  return date;
};

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

/**
 * Lists the cells owned by a grid, skipping the cells of any grid nested inside it.
 */
export const getCalendarGridCells = (grid: Element): HTMLElement[] =>
  Array.from(grid.querySelectorAll<HTMLElement>('[role="gridcell"]')).filter(
    cell => cell.closest('[role="grid"]') === grid,
  );

/**
 * Resolves the cell of the grid handling `event`, ignoring nested grids and editable content except for range hover.
 * Keyboard events also respect descendant focusgroup owners.
 */
export const getCalendarGridCell = (event: React.SyntheticEvent<HTMLElement>): HTMLElement | undefined => {
  const { currentTarget: grid, target } = event;
  const isRangeHover = event.type === 'mouseover' || event.type === 'mouseout';
  if (!isElement(target) || (!isRangeHover && isCalendarKeyboardEditable(target))) {
    return undefined;
  }
  const cell = target.closest<HTMLElement>('[role="gridcell"]');
  const ownerSelector = event.type.startsWith('key') ? '[role="grid"], [focusgroup]' : '[role="grid"]';
  return cell && cell.closest('[role="grid"]') === grid && target.closest(ownerSelector) === grid ? cell : undefined;
};

export const isCalendarArrowKey = (key: string): boolean =>
  key === ArrowDown || key === ArrowLeft || key === ArrowRight || key === ArrowUp;

/**
 * Whether the key event is an arrow without modifiers, which the grids own.
 */
export const isCalendarGridArrow = (event: React.KeyboardEvent): boolean =>
  isCalendarArrowKey(event.key) && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;

/**
 * Whether a cell can be the target of keyboard focus, optionally ignoring hiding at or above a panel boundary.
 */
export const isCalendarCellFocusable = (
  cell: HTMLElement,
  allFocusable: boolean,
  visibilityBoundary?: HTMLElement,
): boolean => {
  if (
    !cell.isConnected ||
    cell.matches(':disabled') ||
    (!allFocusable && cell.getAttribute('aria-disabled') === 'true')
  ) {
    return false;
  }
  const targetWindow = cell.ownerDocument.defaultView;
  const visibility = targetWindow?.getComputedStyle(cell).visibility;
  if (visibility === 'hidden' || visibility === 'collapse') {
    return false;
  }
  for (
    let element: HTMLElement | null = cell;
    element && element !== visibilityBoundary;
    element = element.parentElement
  ) {
    if (element.hidden || element.hasAttribute('inert') || targetWindow?.getComputedStyle(element).display === 'none') {
      return false;
    }
  }
  return true;
};

const getActiveElement = (element: HTMLElement): Element | null => {
  const root = element.getRootNode() as Document | ShadowRoot;
  return 'activeElement' in root ? root.activeElement : null;
};

/**
 * Moves focus through a four-column month or year grid without wrapping rows, skipping unavailable cells.
 */
export const moveCalendarGridFocus = (
  event: React.KeyboardEvent<HTMLElement>,
  cell: HTMLElement,
  dir: 'ltr' | 'rtl',
  allFocusable: boolean,
): void => {
  let step: number;
  if (event.key === ArrowDown) {
    step = CALENDAR_GRID_COLUMNS;
  } else if (event.key === ArrowUp) {
    step = -CALENDAR_GRID_COLUMNS;
  } else if (event.key === getRTLSafeKey(ArrowRight, dir)) {
    step = 1;
  } else if (event.key === getRTLSafeKey(ArrowLeft, dir)) {
    step = -1;
  } else {
    return;
  }

  const cells = getCalendarGridCells(event.currentTarget);
  const currentIndex = cells.indexOf(cell);

  // Own boundary keys too so a native focusgroup cannot fall back to linear movement.
  event.preventDefault();
  const currentRow = Math.floor(currentIndex / CALENDAR_GRID_COLUMNS);
  for (let index = currentIndex + step; index >= 0 && index < cells.length; index += step) {
    if (Math.abs(step) === 1 && Math.floor(index / CALENDAR_GRID_COLUMNS) !== currentRow) {
      break;
    }
    const candidate = cells[index];
    if (isCalendarCellFocusable(candidate, allFocusable)) {
      candidate.focus();
      if (getActiveElement(candidate) === candidate) {
        break;
      }
    }
  }
};
