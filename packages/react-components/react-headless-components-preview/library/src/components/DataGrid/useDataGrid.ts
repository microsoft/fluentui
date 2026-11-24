'use client';

import type * as React from 'react';
import {
  useDataGridBase_unstable,
  useDataGridContext_unstable,
  useDataGridContextValues_unstable,
} from '@fluentui/react-table';
import { isHTMLElement } from '@fluentui/react-utilities';

import type { DataGridContextValue, DataGridContextValues, DataGridProps, DataGridState } from './DataGrid.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a DataGrid component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGrid`.
 *
 * Arrow key navigation uses the `focusgroup` attribute. Browsers without native support need a polyfill.
 * The keys that `focusgroup` does not cover (up and down in the `cell` focus mode, `Home`, `End`, `Ctrl+Home`
 * and `Ctrl+End`) are handled by the base hook with plain DOM queries. Horizontal navigation stops at row edges.
 */
export const useDataGrid = (props: DataGridProps, ref: React.Ref<HTMLElement>): DataGridState => {
  const state: DataGridState = useDataGridBase_unstable(props, ref) as DataGridState;

  if (state.focusMode === 'none') {
    // The base hook adds navigation even in this mode, so retain only the consumer's handlers.
    // eslint-disable-next-line react-hooks/immutability
    state.root.onKeyDown = props.onKeyDown;
    // eslint-disable-next-line react-hooks/immutability
    state.root.onKeyDownCapture = props.onKeyDownCapture;
  } else if (state.focusMode === 'cell') {
    const onKeyDownCapture: React.KeyboardEventHandler<HTMLElement> | undefined = state.root.onKeyDownCapture;
    // eslint-disable-next-line react-hooks/immutability
    state.root.onKeyDownCapture = (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDownCapture?.(event);
      stopAtRowEdge(event);
    };
  }

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroup =
    state.focusMode === 'cell' ? 'toolbar inline' : state.focusMode === 'row_unstable' ? 'toolbar block' : undefined;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sortable'] = toDataAttributeValue(state.sortable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-focus-mode'] = state.focusMode;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selection-mode'] = state.selectableRows ? state.tableState.selection.selectionMode : undefined;

  return state;
};

/**
 * Returns the context of the data grid, which exposes its items, columns, sort and selection state.
 */
export const useDataGridContext = useDataGridContext_unstable as <T>(selector: (ctx: DataGridContextValue) => T) => T;

/**
 * Maps the state of the data grid to the values that are passed through context to its children.
 */
export const useDataGridContextValues = useDataGridContextValues_unstable as (
  state: DataGridState,
) => DataGridContextValues;

const GRID_SELECTOR = '[role="grid"], [role="treegrid"]';
const ROW_SELECTOR = '[role="row"]';
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
const TEXT_ENTRY_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]), textarea, select, [contenteditable=""], [contenteditable="true"]';

const isFocusable = (element: HTMLElement): boolean => {
  if (
    element.hasAttribute('disabled') ||
    element.closest('[hidden], [inert]') ||
    (isHTMLElement(element, { constructorName: 'HTMLInputElement' }) && element.type === 'hidden')
  ) {
    return false;
  }

  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility({ visibilityProperty: true });
  }

  const view = element.ownerDocument.defaultView;
  if (!view) {
    return false;
  }

  for (let current: HTMLElement | null = element; current; current = current.parentElement) {
    if (view.getComputedStyle(current).display === 'none') {
      return false;
    }
  }

  return view.getComputedStyle(element).visibility !== 'hidden';
};

const stopAtRowEdge = (event: React.KeyboardEvent<HTMLElement>): void => {
  if (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
  ) {
    return;
  }

  const target = event.target;
  const grid = event.currentTarget;
  if (!isHTMLElement(target) || target.matches(TEXT_ENTRY_SELECTOR) || target.closest(GRID_SELECTOR) !== grid) {
    return;
  }

  const row = target.closest<HTMLElement>(ROW_SELECTOR);
  if (!row || row.closest(GRID_SELECTOR) !== grid) {
    return;
  }

  const rowItems = [
    ...(row.hasAttribute('tabindex') ? [row] : []),
    ...Array.from(row.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      element => element.parentElement?.closest(GRID_SELECTOR) === grid,
    ),
  ].filter(
    element =>
      isFocusable(element) &&
      !/(^|\s)none(\s|$)/.test(element.closest('[focusgroup]')?.getAttribute('focusgroup') ?? ''),
  );
  const index = rowItems.indexOf(target);
  if (index === -1) {
    return;
  }

  const isRtl = target.ownerDocument.defaultView?.getComputedStyle(target).direction === 'rtl';
  const forward = (event.key === 'ArrowRight') !== isRtl;
  if (forward ? index === rowItems.length - 1 : index === 0) {
    event.preventDefault();
  }
};
