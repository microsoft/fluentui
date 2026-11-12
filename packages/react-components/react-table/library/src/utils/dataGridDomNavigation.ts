import type * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[contenteditable=""]',
  '[contenteditable="true"]',
  '[tabindex]',
].join(',');

const GRID_SELECTOR = '[role="grid"], [role="treegrid"]';

const ROW_SELECTOR = '[role="row"]';

const CELL_SELECTOR = '[role="gridcell"], [role="columnheader"], [role="rowheader"], [role="cell"]';

const TEXT_ENTRY_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]), textarea, select, [contenteditable=""], [contenteditable="true"]';

/**
 * An element is rendered: neither it nor one of its ancestors has `display: none`, and it is not `visibility: hidden`.
 */
const isRendered = (element: HTMLElement): boolean => {
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility({ visibilityProperty: true });
  }

  // Fallback for environments without `checkVisibility`
  const win = element.ownerDocument.defaultView;
  if (!win) {
    return true;
  }

  for (let current: HTMLElement | null = element; current; current = current.parentElement) {
    if (win.getComputedStyle(current).display === 'none') {
      return false;
    }
  }

  return win.getComputedStyle(element).visibility !== 'hidden';
};

/**
 * An element can receive focus programmatically. Unlike the tabbable check, this includes elements with
 * `tabindex="-1"`: a roving tab index (for example the one managed by `focusgroup`) keeps most items there.
 */
const isFocusable = (element: HTMLElement): boolean => {
  if (element.hasAttribute('disabled') || element.closest('[hidden], [inert]')) {
    return false;
  }

  if (isHTMLElement(element, { constructorName: 'HTMLInputElement' }) && element.type === 'hidden') {
    return false;
  }

  return isRendered(element);
};

const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isFocusable);

/**
 * Focuses the element and reports whether it actually received focus.
 */
const tryFocus = (element: HTMLElement): boolean => {
  element.focus();
  return element.ownerDocument.activeElement === element;
};

/**
 * Focuses the first candidate that accepts focus.
 */
const focusFirstOf = (candidates: HTMLElement[]): boolean => candidates.some(tryFocus);

/**
 * Finds the first focusable element inside a container, in DOM order.
 */
export const findFirstFocusable = (container: HTMLElement): HTMLElement | null =>
  getFocusableElements(container)[0] ?? null;

/**
 * Finds the last focusable element inside a container, in DOM order.
 */
export const findLastFocusable = (container: HTMLElement): HTMLElement | null =>
  getFocusableElements(container).pop() ?? null;

/**
 * Finds the last focusable element before the given one, within its closest cell (or its parent when it is not in a
 * cell). The cell itself is a candidate when it is focusable.
 */
export const findPrevFocusable = (element: HTMLElement): HTMLElement | null => {
  const container = element.closest<HTMLElement>(CELL_SELECTOR) ?? element.parentElement;
  if (!container) {
    return null;
  }

  const candidates = [
    ...(container.hasAttribute('tabindex') && isFocusable(container) ? [container] : []),
    ...getFocusableElements(container),
  ];

  // eslint-disable-next-line no-bitwise
  const precedes = (candidate: HTMLElement) => !!(candidate.compareDocumentPosition(element) & 4);

  return candidates.filter(candidate => candidate !== element && precedes(candidate)).pop() ?? null;
};

/**
 * The rows of the grid, without the rows of nested grids.
 */
const getRows = (grid: HTMLElement): HTMLElement[] =>
  Array.from(grid.querySelectorAll<HTMLElement>(ROW_SELECTOR)).filter(row => row.closest(GRID_SELECTOR) === grid);

const getCells = (row: HTMLElement): HTMLElement[] =>
  Array.from(row.querySelectorAll<HTMLElement>(CELL_SELECTOR)).filter(cell => cell.closest(ROW_SELECTOR) === row);

/**
 * The focusable elements of a row in DOM order, starting with the row itself when it is focusable (for example in the
 * row focus mode).
 */
const getRowFocusables = (row: HTMLElement): HTMLElement[] => [
  ...(row.hasAttribute('tabindex') && isFocusable(row) ? [row] : []),
  ...getFocusableElements(row),
];

/**
 * The elements to try to focus for a cell: the cell itself when it is focusable, then its focusable children.
 */
const getCellFocusables = (cell: HTMLElement): HTMLElement[] =>
  cell.hasAttribute('tabindex') && isFocusable(cell) ? [cell] : getFocusableElements(cell);

/**
 * Focuses the cell (or its first focusable child) at the given column of a row, or the closest one before it.
 */
const focusCellAt = (row: HTMLElement, columnIndex: number): boolean => {
  const cells = getCells(row);
  for (let index = Math.min(columnIndex, cells.length - 1); index >= 0; index--) {
    if (focusFirstOf(getCellFocusables(cells[index]))) {
      return true;
    }
  }

  return false;
};

/**
 * Handles the grid keyboard interactions that the `focusgroup` attribute does not cover with plain DOM queries:
 *
 * - `ArrowUp`/`ArrowDown` move to the cell in the same column of the previous/next row
 * - `Home`/`End` move to the first/last cell of the current row
 * - `Ctrl+Home`/`Ctrl+End` move to the first/last focusable element of the grid
 *
 * Elements that are not rendered are skipped. Events coming from a nested grid are left to that grid.
 *
 * `Home` and `End` are also handled by `focusgroup`, which moves to the first/last item of the whole grid. They have
 * to be handled in the capture phase, before `focusgroup` does, with `phase: 'capture'`. The other keys are handled
 * in the bubble phase, so that interactive content of the cells can handle them first.
 *
 * @returns `true` if focus moved, in which case default behavior has been prevented
 */
export const handleDataGridKeyDown = (
  event: React.KeyboardEvent<HTMLElement>,
  grid: HTMLElement,
  options: { cellNavigation: boolean; phase: 'capture' | 'bubble' },
): boolean => {
  if (event.defaultPrevented || event.altKey || event.metaKey) {
    return false;
  }

  const target = event.target;
  if (!isHTMLElement(target) || target.matches(TEXT_ENTRY_SELECTOR) || target.closest(GRID_SELECTOR) !== grid) {
    return false;
  }

  const isRowEdgeKey = !event.ctrlKey && (event.key === 'Home' || event.key === 'End');
  if (options.phase === 'capture' ? !isRowEdgeKey : isRowEdgeKey) {
    return false;
  }

  const rows = getRows(grid).filter(isRendered);
  let handled = false;

  if (event.ctrlKey) {
    if (event.shiftKey || (event.key !== 'Home' && event.key !== 'End')) {
      return false;
    }

    const toEnd = event.key === 'End';
    const orderedRows = toEnd ? [...rows].reverse() : rows;
    handled = orderedRows.some(row => {
      const focusables = getRowFocusables(row);
      return focusFirstOf(toEnd ? focusables.reverse() : focusables);
    });
  } else {
    if (!options.cellNavigation || event.shiftKey) {
      return false;
    }

    const currentRow = target.closest<HTMLElement>(ROW_SELECTOR);
    const currentCell = target.closest<HTMLElement>(CELL_SELECTOR);
    const rowIndex = currentRow ? rows.indexOf(currentRow) : -1;
    if (!currentRow || !currentCell || rowIndex === -1) {
      return false;
    }

    const cells = getCells(currentRow);
    const columnIndex = cells.indexOf(currentCell);

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        const step = event.key === 'ArrowUp' ? -1 : 1;
        // Rows without a focusable cell are skipped
        for (let index = rowIndex + step; !handled && index >= 0 && index < rows.length; index += step) {
          handled = focusCellAt(rows[index], columnIndex);
        }
        break;
      }
      case 'Home':
        handled = focusCellAt(currentRow, 0);
        break;
      case 'End':
        handled = focusCellAt(currentRow, cells.length - 1);
        break;
    }
  }

  if (handled) {
    event.preventDefault();
  }

  return handled;
};
