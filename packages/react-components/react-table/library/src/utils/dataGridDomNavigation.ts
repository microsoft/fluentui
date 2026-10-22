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

const CELL_SELECTOR = '[role="gridcell"], [role="columnheader"], [role="rowheader"], [role="cell"]';

const TEXT_ENTRY_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]), textarea, select, [contenteditable=""], [contenteditable="true"]';

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

  return true;
};

const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isFocusable);

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

const getCells = (row: HTMLElement): HTMLElement[] =>
  Array.from(row.querySelectorAll<HTMLElement>(CELL_SELECTOR)).filter(cell => cell.closest('[role="row"]') === row);

const getFocusTarget = (cell: HTMLElement): HTMLElement | null =>
  cell.hasAttribute('tabindex') && isFocusable(cell) ? cell : findFirstFocusable(cell);

/**
 * Focuses the cell (or its first focusable child) at the given column of a row, or the closest one before it.
 */
const focusCellAt = (row: HTMLElement, columnIndex: number): boolean => {
  const cells = getCells(row);
  for (let index = Math.min(columnIndex, cells.length - 1); index >= 0; index--) {
    const target = getFocusTarget(cells[index]);
    if (target) {
      target.focus();
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
 * `Home` and `End` are also handled by `focusgroup`, which moves to the first/last item of the whole grid. They have
 * to be handled in the capture phase, before `focusgroup` does, with `phase: 'capture'`. The other keys are handled
 * in the bubble phase, so that interactive content of the cells can handle them first.
 *
 * @returns `true` if the event was handled, in which case default behavior has been prevented
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
  if (!isHTMLElement(target) || target.matches(TEXT_ENTRY_SELECTOR)) {
    return false;
  }

  const isRowEdgeKey = !event.ctrlKey && (event.key === 'Home' || event.key === 'End');
  if (options.phase === 'capture' ? !isRowEdgeKey : isRowEdgeKey) {
    return false;
  }

  const rows = Array.from(grid.querySelectorAll<HTMLElement>('[role="row"]'));

  if (event.ctrlKey) {
    if (event.shiftKey || (event.key !== 'Home' && event.key !== 'End')) {
      return false;
    }

    const row = event.key === 'Home' ? rows[0] : rows[rows.length - 1];
    const element = row && (event.key === 'Home' ? findFirstFocusable(row) : findLastFocusable(row));
    if (!element) {
      return false;
    }

    element.focus();
    event.preventDefault();
    return true;
  }

  if (!options.cellNavigation || event.shiftKey) {
    return false;
  }

  const currentRow = target.closest<HTMLElement>('[role="row"]');
  const currentCell = target.closest<HTMLElement>(CELL_SELECTOR);
  if (!currentRow || !currentCell || !grid.contains(currentRow)) {
    return false;
  }

  const cells = getCells(currentRow);
  const columnIndex = cells.indexOf(currentCell);
  let handled = false;

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown': {
      const sibling = rows[rows.indexOf(currentRow) + (event.key === 'ArrowUp' ? -1 : 1)];
      handled = !!sibling && focusCellAt(sibling, columnIndex);
      break;
    }
    case 'Home':
      handled = focusCellAt(currentRow, 0);
      break;
    case 'End':
      handled = focusCellAt(currentRow, cells.length - 1);
      break;
  }

  if (handled) {
    event.preventDefault();
  }

  return handled;
};
