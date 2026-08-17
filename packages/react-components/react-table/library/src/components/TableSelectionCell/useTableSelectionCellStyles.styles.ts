import { clsx } from 'clsx';
import type { TableSelectionCellState } from './TableSelectionCell.types';

import styles from './TableSelectionCell.module.css';

/**
 * The selection cell's DEFAULT-SCALE width in pixels, and the SSR/pre-mount fallback for
 * width math (public as `TABLE_SELECTION_CELL_WIDTH`).
 *
 * The rendered width is `w-44` = `calc(44px * var(--base-scale))`
 * (TableSelectionCell.module.css), so at a non-default `--base-scale` the live width
 * diverges from this constant. Consumers of the RENDERED width must scale it —
 * `useDataGrid_unstable` reads `--base-scale` at the grid via `useCssVarValue` and
 * multiplies (PR-36513 review item 17); this constant is the value at scale 1 and the
 * fallback wherever the variable cannot be read.
 */
export const CELL_WIDTH = 44;

/**
 * TableSelectionCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tableSelectionCellClassNames: { root: string } = {
  root: 'group/fui-table-selection-cell',
};

/**
 * Apply styling to the TableSelectionCell slots based on the state
 */
export const useTableSelectionCellStyles_unstable = (state: TableSelectionCellState): TableSelectionCellState => {
  // Same 2-branch box model as TableCell — picked in JS exactly as the two Griffel class
  // maps were, with no `data-*` mirror, because nothing outside this hook reads it
  // (DECISIONS.md D15.6).
  const layout = state.noNativeElements ? 'flex' : 'table';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    tableSelectionCellClassNames.root,
    styles[`${layout}-root`],
    state.subtle && state.checked === false && styles.subtle,
    state.hidden && styles.hidden,
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  if (state.radioIndicator) {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    state.radioIndicator.className = clsx(styles['radio-indicator'], state.radioIndicator.className);
  }

  return state;
};
