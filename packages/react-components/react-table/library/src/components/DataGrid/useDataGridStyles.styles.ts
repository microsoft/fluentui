'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useTableStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks call nothing and carry no directive at all; see
 * useTableStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridState } from './DataGrid.types';
import { useTableStyles_unstable } from '../Table/useTableStyles.styles';

/**
 * DataGrid's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * A DataGrid IS a Table, so this same element ALSO carries `group/fui-table` from
 * `useTableStyles_unstable` — two markers by design, exactly as ToggleButton's root carries
 * both `group/fui-toggle-button` and `group/fui-button` (D16.3). A descendant can address
 * whichever identity it means. The pair is declared to react-conformance through
 * `testOptions['has-group-marker'].markers`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const dataGridClassNames: { root: string } = {
  root: 'group/fui-data-grid',
};

/**
 * Apply styling to the DataGrid slots based on the state
 */
export const useDataGridStyles_unstable = (state: DataGridState): DataGridState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, root: { ...state.root, className: clsx(dataGridClassNames.root, state.root.className) } };

  // DataGridState widens TableState, so the delegate's narrower return is re-merged onto this
  // component's own shape (F1 of the D14 mutation removal — thread the
  // composed result, do not discard it).
  state = { ...state, ...useTableStyles_unstable(state) };

  return state;
};
