import { clsx } from 'clsx';
import type { TableCellState } from './TableCell.types';

import styles from './TableCell.module.css';

/**
 * TableCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tableCellClassNames: { root: string } = {
  root: 'group/fui-table-cell',
};

/**
 * Legacy alias for `tableCellClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableCell` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 */
export const tableCellClassName = tableCellClassNames.root;

/**
 * Apply styling to the TableCell slots based on the state
 */
export const useTableCellStyles_unstable = (state: TableCellState): TableCellState => {
  // The box model and the size step are picked by the SAME ternary, exactly as the two
  // Griffel class maps were: the native-table branch sizes with `height`, the flex branch
  // with `min-height`, so the four combinations are a genuine 2×3 product and not a `size`
  // variant over one box model. No `data-*` mirror is minted for either — nothing outside
  // this hook needs to read them from CSS (DECISIONS.md D15.6).
  const layout = state.noNativeElements ? 'flex' : 'table';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    tableCellClassNames.root,
    styles[`${layout}-root`],
    styles[`${layout}-${state.size}`],
    state.root.className,
  );

  return state;
};
