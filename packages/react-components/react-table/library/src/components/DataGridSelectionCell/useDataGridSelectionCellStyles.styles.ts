'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useTableSelectionCellStyles_unstable`, so the rule agrees the directive
 * is required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useTableSelectionCellStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { useTableSelectionCellStyles_unstable } from '../TableSelectionCell/useTableSelectionCellStyles.styles';

/**
 * DataGridSelectionCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity. The `fui-DataGridSelectionCell` /
 * `fui-DataGridSelectionCell__<slot>` BEM statics are gone (D16.1) and the type has narrowed
 * from `SlotClassNames<DataGridSelectionCellSlots>` to `{ root: string }`, so a read of
 * `checkboxIndicator` or `radioIndicator` is a compile error on the exact line that would
 * otherwise have silently stopped matching.
 *
 * A DataGridSelectionCell IS a TableSelectionCell, so this element ALSO carries
 * `group/fui-table-selection-cell` from `useTableSelectionCellStyles_unstable` — two markers
 * by design (D16.3), declared to react-conformance through
 * `testOptions['has-group-marker'].markers`. That second marker is load-bearing rather than
 * decorative here: it is what TableRow / DataGridRow select to reveal a subtle selection
 * cell on row interaction.
 *
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(dataGridSelectionCellClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 */
export const dataGridSelectionCellClassNames: { root: string } = {
  root: 'group/fui-data-grid-selection-cell',
};

/**
 * Apply styling to the DataGridSelectionCell slots based on the state
 */
export const useDataGridSelectionCellStyles_unstable = (
  state: DataGridSelectionCellState,
): DataGridSelectionCellState => {
  // `useTableSelectionCellStyles_unstable` is called LAST (it ran first under Griffel) so
  // that its unconditional `styles.root` is PREPENDED and
  // `group/fui-data-grid-selection-cell` can never be `classList[0]`, where nwsapi's jsdom
  // `:scope` polyfill throws on the `/` (D15.1 / D16.2). It also keeps the consumer
  // className last. The swap is cascade-inert: this component contributes no declarations,
  // and `@layer fui.*` decides every tie (D2).
  state = {
    ...state,
    root: { ...state.root, className: clsx('group/fui-data-grid-selection-cell', state.root.className) },
  };

  // NOTE: the `checkboxIndicator` and `radioIndicator` assignments are gone. Each one's ONLY
  // library token was a `fui-DataGridSelectionCell__<slot>` static (D16.1 removed both) —
  // this hook attached no declarations to either — so what remained,
  // `clsx(state.<slot>.className)`, was an identity on the consumer's own string
  // (CONVERSION_GUIDE "a slot whose only library token is the static").
  // `useTableSelectionCellStyles_unstable` below still styles `radioIndicator`.

  state = useTableSelectionCellStyles_unstable(state);

  return state;
};
