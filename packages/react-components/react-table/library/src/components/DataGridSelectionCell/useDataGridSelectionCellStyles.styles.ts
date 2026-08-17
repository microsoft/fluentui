'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls
 * `useTableSelectionCellStyles_unstable`, so `enforce-use-client` sees a hook call and never
 * reports the directive as unnecessary. Converted leaf hooks call nothing and carry no
 * directive at all; see useTableSelectionCellStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { useTableSelectionCellStyles_unstable } from '../TableSelectionCell/useTableSelectionCellStyles.styles';

/**
 * DataGridSelectionCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * A DataGridSelectionCell IS a TableSelectionCell, so this element ALSO carries
 * `group/fui-table-selection-cell` from `useTableSelectionCellStyles_unstable` — two markers
 * by design (D16.3), declared to react-conformance through
 * `testOptions['has-group-marker'].markers`. That second marker is load-bearing rather than
 * decorative here: it is what TableRow / DataGridRow select to reveal a subtle selection
 * cell on row interaction.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(dataGridSelectionCellClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  state = useTableSelectionCellStyles_unstable(state);

  return state;
};
