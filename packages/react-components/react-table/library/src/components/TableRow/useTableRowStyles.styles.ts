import { clsx } from 'clsx';
import type { TableRowState } from './TableRow.types';

import styles from './TableRow.module.css';

/**
 * TableRow's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tableRowClassNames: { root: string } = {
  root: 'group/fui-table-row',
};

/**
 * Legacy alias for `tableRowClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableRow` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 */
export const tableRowClassName = tableRowClassNames.root;

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    tableRowClassNames.root,
    !state.isHeaderRow && styles['root-interactive'],
    styles[state.size],
    state.noNativeElements ? styles['flex-root'] : styles['table-root'],
    styles[state.appearance],
    state.root.className,
  );

  return state;
};
