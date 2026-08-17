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
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(tableSelectionCellClassNames.root)` from `@fluentui/react-utilities` (D16.5).
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

  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` (DECISIONS.md D15.1 / D16.2;
  // asserted by `component-has-group-marker`).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // TableSelectionCell.module.css and by BLOCK order within it — that file is authored
  // bucket-major because arg #4's focus-within rule has to keep outranking arg #5's flat
  // `opacity: 0`, which `:where()` flattening would otherwise reverse.
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
  state.root.className = clsx(
    styles.root,
    tableSelectionCellClassNames.root,
    styles[`${layout}-root`],
    state.subtle && state.checked === false && styles.subtle,
    state.hidden && styles.hidden,
    state.root.className,
  );

  // NOTE: there is deliberately no `state.checkboxIndicator` assignment. Its only library
  // token was the `fui-TableSelectionCell__checkboxIndicator` static (D16.1 removed it) —
  // the Griffel source attached no declarations to that slot — so what remained,
  // `clsx(state.checkboxIndicator.className)`, was an identity on the consumer's own
  // string: dead code implying this hook styles a slot it does not
  // (CONVERSION_GUIDE "a slot whose only library token is the static").

  if (state.radioIndicator) {
    // This class lands on react-radio's ROOT, so its rule sits at `fui.components.l2`
    // (D2 amendment 2). No marker here: a group cannot style itself, and Radio stamps its
    // own `group/fui-radio` on this same element.
    state.radioIndicator.className = clsx(styles['radio-indicator'], state.radioIndicator.className);
  }

  return state;
};
