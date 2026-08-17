import { clsx } from 'clsx';
import type { TableBodyState } from './TableBody.types';

import styles from './TableBody.module.css';

/**
 * TableBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tableBodyClassNames: { root: string } = {
  root: 'group/fui-table-body',
};

/**
 * Legacy alias for `tableBodyClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableBody` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 */
export const tableBodyClassName = tableBodyClassNames.root;

/**
 * Apply styling to the TableBody slots based on the state
 */
export const useTableBodyStyles_unstable = (state: TableBodyState): TableBodyState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    state.noNativeElements ? styles['flex-root'] : styles['table-root'],
    tableBodyClassNames.root,
    state.root.className,
  );

  return state;
};
