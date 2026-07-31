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
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity. The `fui-DataGridBody` BEM static is gone (D16.1) and the
 * type has narrowed from `SlotClassNames<DataGridBodySlots>` to `{ root: string }`.
 *
 * A DataGridBody IS a TableBody, so this element ALSO carries `group/fui-table-body` from
 * `useTableBodyStyles_unstable` — two markers by design (D16.3), declared to
 * react-conformance through `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: use `fuiSelector(dataGridBodyClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5).
 */
export const dataGridBodyClassNames: { root: string } = {
  root: 'group/fui-data-grid-body',
};

/**
 * Apply styling to the DataGridBody slots based on the state
 */
export const useDataGridBodyStyles_unstable = (state: DataGridBodyState): DataGridBodyState => {
  // `useTableBodyStyles_unstable` is called LAST (it ran first under Griffel) so that its
  // unconditional layout class is PREPENDED and `group/fui-data-grid-body` can never be
  // `classList[0]`, where nwsapi's jsdom `:scope` polyfill throws on the `/` (D15.1 /
  // D16.2). It also keeps the consumer className last. The swap is cascade-inert: this
  // component contributes no declarations, and `@layer fui.*` decides every tie (D2).
  state = { ...state, root: { ...state.root, className: clsx('group/fui-data-grid-body', state.root.className) } };

  // DataGridBodyState widens TableBodyState, so the delegate's narrower return is re-merged onto
  // this component's own shape (F1 of the D14 mutation removal — thread the
  // composed result, do not discard it).
  state = { ...state, ...useTableBodyStyles_unstable(state) };

  return state;
};
