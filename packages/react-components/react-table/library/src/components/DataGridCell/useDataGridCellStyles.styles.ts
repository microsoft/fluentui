'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useTableCellStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useTableCellStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridCellState } from './DataGridCell.types';
import { useTableCellStyles_unstable } from '../TableCell/useTableCellStyles.styles';

/**
 * DataGridCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity. The `fui-DataGridCell` BEM static is gone (D16.1) and the
 * type has narrowed from `SlotClassNames<DataGridCellSlots>` to `{ root: string }`.
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
  state = { ...state, root: { ...state.root, className: clsx('group/fui-data-grid-cell', state.root.className) } };

  state = useTableCellStyles_unstable(state);

  return state;
};
