import type * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home } from '@fluentui/keyboard-keys';

const GRID = '[role="grid"]';
const GRIDCELL = '[role="gridcell"]';

const isElement = (target: EventTarget | null): target is Element =>
  !!(target as Element | null)?.ownerDocument?.defaultView &&
  target instanceof (target as Element).ownerDocument.defaultView!.Element;

/** Whether content owns text editing rather than grid keyboard navigation. */
export const isEditable = (target: EventTarget | null): boolean => {
  if (!isElement(target)) {
    return false;
  }
  if (target.closest('input,textarea,select')) {
    return true;
  }
  for (let element: Element | null = target; element; element = element.parentElement) {
    const value = element.getAttribute('contenteditable')?.trim().toLowerCase();
    if (value === '' || value === 'true' || value === 'plaintext-only') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
  }
  return false;
};

/** Whether paging keys belong to a nested widget rather than a Calendar grid. */
export const isNestedWidget = (target: EventTarget | null, root: Element): boolean => {
  const owner = isElement(target) && target.closest(`${GRID},[role="toolbar"]`);
  return !!owner && root.contains(owner) && !owner.hasAttribute('data-fui-calendar-grid');
};

/** The cells owned by a grid, excluding nested grids, in render order. */
export const getGridCells = (grid: Element): HTMLElement[] =>
  Array.from(grid.querySelectorAll<HTMLElement>(GRIDCELL)).filter(cell => cell.closest(GRID) === grid);

/** Resolves an event's cell, respecting nested grids, toolbars and editable content. */
export const getEventCell = (event: React.SyntheticEvent<HTMLElement>): HTMLElement | undefined => {
  const { currentTarget: grid, target, type } = event;
  if (!isElement(target) || (type !== 'mouseover' && type !== 'mouseout' && isEditable(target))) {
    return undefined;
  }
  const cell = target.closest<HTMLElement>(GRIDCELL);
  const owner = type.startsWith('key') || type === 'focus' ? `${GRID},[role="toolbar"]` : GRID;
  return cell && cell.closest(GRID) === grid && target.closest(owner) === grid ? cell : undefined;
};

/** Whether a key event is an unmodified arrow, Home or End key. */
export const isGridNavigationKey = (event: React.KeyboardEvent): boolean =>
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey &&
  [ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Home, End].includes(event.key);

/**
 * Finds the cell an arrow, Home or End key moves to, skipping ineligible cells. Vertical arrows keep the column.
 * With `wrap` (days) horizontal arrows continue into the adjacent row and Home/End stay in the row; without it
 * (months, years) horizontal arrows stay in the row and Home/End reach the grid's first or last eligible cell.
 * @returns the target index, or `undefined` when no eligible cell lies in that direction
 */
export const getTargetIndex = (
  key: string,
  rtl: boolean,
  index: number,
  count: number,
  columns: number,
  isEligible: (index: number) => boolean,
  wrap: boolean,
): number | undefined => {
  if (key === Home || key === End) {
    const start = wrap ? index - (index % columns) : 0;
    const end = wrap ? Math.min(start + columns, count) - 1 : count - 1;
    const step = key === Home ? 1 : -1;
    for (let candidate = key === Home ? start : end; candidate >= start && candidate <= end; candidate += step) {
      if (isEligible(candidate)) {
        return candidate;
      }
    }
    return undefined;
  }
  const step =
    key === ArrowDown
      ? columns
      : key === ArrowUp
      ? -columns
      : (key === ArrowRight) !== rtl
      ? 1
      : key === ArrowRight || key === ArrowLeft
      ? -1
      : 0;
  const row = Math.floor(index / columns);
  for (let candidate = index + step; step && candidate >= 0 && candidate < count; candidate += step) {
    if (!wrap && Math.abs(step) === 1 && Math.floor(candidate / columns) !== row) {
      return undefined;
    }
    if (isEligible(candidate)) {
      return candidate;
    }
  }
  return undefined;
};

/**
 * Moves focus to the tab stop of the grid in `container` (a panel, or the first panel inside it), otherwise to its
 * last enabled previous/next button. Returns whether focus moved.
 */
export const focusCalendarGrid = (container: Element | null | undefined): boolean => {
  const panel = container?.matches('[data-view]') ? container : container?.querySelector('[data-view]');
  const grid = panel?.querySelector('[data-fui-calendar-grid]');
  const target =
    (grid && getGridCells(grid).find(cell => cell.tabIndex === 0)) ??
    // The next button first, as moving forward is the likelier way to reach an available date. A natively disabled
    // button cannot take focus, even when its date bounds are open.
    Array.from(panel?.querySelectorAll<HTMLElement>('button[aria-disabled="false"]:not(:disabled)') ?? []).pop();
  target?.focus({ preventScroll: true });
  return !!target;
};
