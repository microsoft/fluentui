'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useTableCellStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks call nothing and carry no directive at all; see useTableCellStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridCellState } from './DataGridCell.types';
import { useTableCellStyles_unstable } from '../TableCell/useTableCellStyles.styles';

/**
 * DataGridCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * A DataGridCell IS a TableCell, so this element ALSO carries `group/fui-table-cell` from
 * `useTableCellStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: use `fuiSelector(dataGridCellClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5).
 */
export const dataGridCellClassNames: { root: string } = {
  root: 'group/fui-data-grid-cell',
};

/**
 * Apply styling to the DataGridCell slots based on the state
 */
export const useDataGridCellStyles_unstable = (state: DataGridCellState): DataGridCellState => {
  // `useTableCellStyles_unstable` is called LAST (it ran first under Griffel) so that its
  // unconditional `styles.root` is PREPENDED and `group/fui-data-grid-cell` can never be
  // `classList[0]`, where nwsapi's jsdom `:scope` polyfill throws on the `/` (D15.1 /
  // D16.2). It also keeps the consumer className last. The swap is cascade-inert: this
  // component contributes no declarations, and `@layer fui.*` decides every tie (D2).
  state = { ...state, root: { ...state.root, className: clsx(dataGridCellClassNames.root, state.root.className) } };

  state = useTableCellStyles_unstable(state);

  return state;
};
