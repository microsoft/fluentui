'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useTableHeaderCellStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks call nothing and carry no directive at all; see useTableHeaderCellStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useTableHeaderCellStyles_unstable } from '../TableHeaderCell/useTableHeaderCellStyles.styles';

/**
 * DataGridHeaderCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * A DataGridHeaderCell IS a TableHeaderCell, so this element ALSO carries
 * `group/fui-table-header-cell` from `useTableHeaderCellStyles_unstable` — two markers by
 * design (D16.3), declared to react-conformance through
 * `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(dataGridHeaderCellClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const dataGridHeaderCellClassNames: { root: string } = {
  root: 'group/fui-data-grid-header-cell',
};

/**
 * Apply styling to the DataGridHeaderCell slots based on the state
 */
export const useDataGridHeaderCellStyles_unstable = (state: DataGridHeaderCellState): DataGridHeaderCellState => {
  // `useTableHeaderCellStyles_unstable` is called LAST (it ran first under Griffel) so that
  // its unconditional `styles.root` is PREPENDED and `group/fui-data-grid-header-cell` can
  // never be `classList[0]`, where nwsapi's jsdom `:scope` polyfill throws on the `/`
  // (D15.1 / D16.2). It also keeps the consumer className last. The swap is cascade-inert:
  // this component contributes no declarations, and `@layer fui.*` decides every tie (D2).
  state = {
    ...state,
    root: { ...state.root, className: clsx(dataGridHeaderCellClassNames.root, state.root.className) },
  };

  // NOTE: the `button`, `sortIcon` and `aside` assignments are gone. Each one's ONLY
  // library token was a `fui-DataGridHeaderCell__<slot>` static (D16.1 removed them all) —
  // this hook attached no declarations to any of them — so what remained,
  // `clsx(state.<slot>.className)`, was an identity on the consumer's own string: dead code
  // implying this hook styles slots it does not (CONVERSION_GUIDE "a slot whose only
  // library token is the static"). `useTableHeaderCellStyles_unstable` below still styles
  // `button` and `sortIcon`.

  state = useTableHeaderCellStyles_unstable(state);

  return state;
};
