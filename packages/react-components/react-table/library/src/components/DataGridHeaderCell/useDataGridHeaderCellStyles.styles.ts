'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useTableHeaderCellStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useTableHeaderCellStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useTableHeaderCellStyles_unstable } from '../TableHeaderCell/useTableHeaderCellStyles.styles';

/**
 * DataGridHeaderCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity. The `fui-DataGridHeaderCell` /
 * `fui-DataGridHeaderCell__<slot>` BEM statics are gone (D16.1) and the type has narrowed
 * from `SlotClassNames<DataGridHeaderCellSlots>` to `{ root: string }`, so a read of
 * `button`, `sortIcon` or `aside` is a compile error on the exact line that would otherwise
 * have silently stopped matching.
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
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx('group/fui-data-grid-header-cell', state.root.className);

  // NOTE: the `button`, `sortIcon` and `aside` assignments are gone. Each one's ONLY
  // library token was a `fui-DataGridHeaderCell__<slot>` static (D16.1 removed them all) —
  // this hook attached no declarations to any of them — so what remained,
  // `clsx(state.<slot>.className)`, was an identity on the consumer's own string: dead code
  // implying this hook styles slots it does not (CONVERSION_GUIDE "a slot whose only
  // library token is the static"). `useTableHeaderCellStyles_unstable` below still styles
  // `button` and `sortIcon`.

  useTableHeaderCellStyles_unstable(state);

  return state;
};
