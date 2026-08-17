import { clsx } from 'clsx';
import type { TableHeaderCellState } from './TableHeaderCell.types';

import styles from './TableHeaderCell.module.css';

/**
 * TableHeaderCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tableHeaderCellClassNames: { root: string } = {
  root: 'group/fui-table-header-cell',
};

/**
 * Legacy alias for `tableHeaderCellClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableHeaderCell` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 */
export const tableHeaderCellClassName = tableHeaderCellClassNames.root;

/**
 * Apply styling to the TableHeaderCell slots based on the state
 */
export const useTableHeaderCellStyles_unstable = (state: TableHeaderCellState): TableHeaderCellState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    tableHeaderCellClassNames.root,
    state.sortable && styles['root-interactive'],
    state.noNativeElements ? styles['flex-root'] : styles['table-root'],
    state.root.className,
  );

  // Sub-slots carry NO marker (D15.1: a group cannot style itself, and every sub-component
  // has its own root), so the unconditional `styles['reset-button']` simply leads here.
  state.button.className = clsx(
    styles['reset-button'],
    styles.button,
    state.sortable && styles.sortable,
    state.button.className,
  );

  if (state.sortIcon) {
    state.sortIcon.className = clsx(styles['sort-icon'], state.sortIcon.className);
  }

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return state;
};
