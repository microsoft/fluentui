'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useTableBodyStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks call nothing and carry no directive at all; see useTableBodyStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridBodyState } from './DataGridBody.types';
import { useTableBodyStyles_unstable } from '../TableBody/useTableBodyStyles.styles';

/**
 * DataGridBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * A DataGridBody IS a TableBody, so this element ALSO carries `group/fui-table-body` from
 * `useTableBodyStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const dataGridBodyClassNames: { root: string } = {
  root: 'group/fui-data-grid-body',
};

/**
 * Apply styling to the DataGridBody slots based on the state
 */
export const useDataGridBodyStyles_unstable = (state: DataGridBodyState): DataGridBodyState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, root: { ...state.root, className: clsx(dataGridBodyClassNames.root, state.root.className) } };

  // DataGridBodyState widens TableBodyState, so the delegate's narrower return is re-merged onto
  // this component's own shape (F1 of the D14 mutation removal — thread the
  // composed result, do not discard it).
  state = { ...state, ...useTableBodyStyles_unstable(state) };

  return state;
};
