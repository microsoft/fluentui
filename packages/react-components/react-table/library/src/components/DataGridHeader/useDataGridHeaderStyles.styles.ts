'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useTableHeaderStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks call nothing and carry no directive at all; see useTableHeaderStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridHeaderState } from './DataGridHeader.types';
import { useTableHeaderStyles_unstable } from '../TableHeader/useTableHeaderStyles.styles';

/**
 * DataGridHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * A DataGridHeader IS a TableHeader, so this element ALSO carries `group/fui-table-header`
 * from `useTableHeaderStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const dataGridHeaderClassNames: { root: string } = {
  root: 'group/fui-data-grid-header',
};

/**
 * Apply styling to the DataGridHeader slots based on the state
 */
export const useDataGridHeaderStyles_unstable = (state: DataGridHeaderState): DataGridHeaderState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, root: { ...state.root, className: clsx(dataGridHeaderClassNames.root, state.root.className) } };

  state = useTableHeaderStyles_unstable(state);

  return state;
};
