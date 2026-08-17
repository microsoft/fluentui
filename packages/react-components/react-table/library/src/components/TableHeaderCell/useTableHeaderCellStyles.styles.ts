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
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(tableHeaderCellClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const tableHeaderCellClassNames: { root: string } = {
  root: 'group/fui-table-header-cell',
};

/**
 * Legacy alias for `tableHeaderCellClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableHeaderCell` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 *
 * Deliberately NOT tagged `@deprecated`, for the same reason the `*ClassNames` objects are
 * not (see react-card's CardHeader): the tag propagates to every barrel that re-exports the
 * symbol — three in this package plus the `@fluentui/react-components` umbrella, which this
 * conversion does not own — and `@typescript-eslint/no-deprecated` then errors on each of
 * those re-export specifiers. Prefer `tableHeaderCellClassNames.root`.
 */
export const tableHeaderCellClassName = tableHeaderCellClassNames.root;

/**
 * Apply styling to the TableHeaderCell slots based on the state
 */
export const useTableHeaderCellStyles_unstable = (state: TableHeaderCellState): TableHeaderCellState => {
  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` (DECISIONS.md D15.1 / D16.2;
  // asserted by `component-has-group-marker`).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableHeaderCell.module.css
  // and by BLOCK order within it — see that file's header for the mapping back to the
  // mergeClasses() argument order, including why it is authored bucket-major.
  //
  // No `data-sortable` mirror is minted: `sortable` gates two module classes on two
  // elements this hook already holds, and nothing reads it from CSS across an element
  // boundary (DECISIONS.md D15.6).
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
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

  // NOTE: there is deliberately no `state.aside` assignment. Its two library tokens were
  // the `fui-TableHeaderCell__aside` static (D16.1 removed it) and `useStyles.resizeHandle`,
  // which is `{}` in the Griffel source and compiled to no class — so what remained,
  // `clsx(state.aside.className)`, was an identity on the consumer's own string: dead code
  // implying this hook styles a slot it does not (CONVERSION_GUIDE "a slot whose only
  // library token is the static"). The TableResizeHandle that fills this slot styles itself.

  return state;
};
