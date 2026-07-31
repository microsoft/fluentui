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
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-DataGrid` BEM static is gone (D16.1) and the type has narrowed from
 * `SlotClassNames<DataGridSlots>` to `{ root: string }`.
 *
 * A DataGrid IS a Table, so this same element ALSO carries `group/fui-table` from
 * `useTableStyles_unstable` — two markers by design, exactly as ToggleButton's root carries
 * both `group/fui-toggle-button` and `group/fui-button` (D16.3). A descendant can address
 * whichever identity it means. The pair is declared to react-conformance through
 * `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: use `fuiSelector(dataGridClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5).
 */
export const dataGridClassNames: { root: string } = {
  root: 'group/fui-data-grid',
};

/**
 * Apply styling to the DataGrid slots based on the state
 */
export const useDataGridStyles_unstable = (state: DataGridState): DataGridState => {
  // `useTableStyles_unstable` is called LAST, not first as it was under Griffel, and that
  // reordering is what keeps the D16.2 invariant holdable without inventing an
  // identity-only local for a component that has no styles of its own: Table's hook
  // PREPENDS its unconditional `styles.root`, so the rendered `classList[0]` is Table's
  // hashed module class and `group/fui-data-grid` never lands at index 0 (nwsapi's jsdom
  // `:scope` polyfill throws on the `/` there — D15.1). It also keeps the consumer's
  // className last in the emitted string, per CONVERSION_GUIDE §3.
  //
  // The swap is inert for the cascade: this component contributes no declarations at all,
  // and argument order carries no cascade meaning in this system — the `@layer fui.*` order
  // decides every tie (DECISIONS.md D2). Same shape as react-button's ToggleButton and
  // react-toolbar's ToolbarButton, which have always called the wrapped hook last.
  state = { ...state, root: { ...state.root, className: clsx('group/fui-data-grid', state.root.className) } };

  // DataGridState widens TableState, so the delegate's narrower return is re-merged onto this
  // component's own shape (F1 of the D14 mutation removal — thread the
  // composed result, do not discard it).
  state = { ...state, ...useTableStyles_unstable(state) };

  return state;
};
