'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it calls `useDataGridContext_unstable` and
 * `useTableRowStyles_unstable`, so `enforce-use-client` sees a hook call and never reports
 * the directive as unnecessary. Converted leaf hooks call nothing and carry no directive at
 * all; see useTableRowStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridRowState } from './DataGridRow.types';
import { useTableRowStyles_unstable } from '../TableRow/useTableRowStyles.styles';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';

import styles from './DataGridRow.module.css';

/**
 * DataGridRow's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * A DataGridRow IS a TableRow, so this element ALSO carries `group/fui-table-row` from
 * `useTableRowStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const dataGridRowClassNames: { root: string } = {
  root: 'group/fui-data-grid-row',
};

/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useDataGridRowStyles_unstable = (state: DataGridRowState): DataGridRowState => {
  const isSubtle = useDataGridContext_unstable(ctx => ctx.subtleSelection);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(dataGridRowClassNames.root, isSubtle && styles['subtle-selection'], state.root.className),
    },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal).
  // DataGridRow adds a `selectionCell` slot, so TableRow's `components` map is NARROWER than this
  // one; it is dropped off the return so this component keeps its own, and every other key
  // TableRow composed is merged onto this component's wider shape.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { components: tableRowComponents, ...composedTableRow } = useTableRowStyles_unstable(state);
  state = { ...state, ...composedTableRow };

  return state;
};
