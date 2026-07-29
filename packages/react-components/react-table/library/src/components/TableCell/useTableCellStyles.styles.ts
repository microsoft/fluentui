'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { TableCellState } from './TableCell.types';

import styles from './TableCell.module.css';

/**
 * TableCell's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TableCell` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TableCellSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: use `fuiSelector(tableCellClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5).
 */
export const tableCellClassNames: { root: string } = {
  root: 'group/fui-table-cell',
};

/**
 * Legacy alias for `tableCellClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableCell` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 *
 * Deliberately NOT tagged `@deprecated`, for the same reason the `*ClassNames` objects are
 * not (see react-card's CardHeader): the tag propagates to every barrel that re-exports the
 * symbol — three in this package plus the `@fluentui/react-components` umbrella, which this
 * conversion does not own — and `@typescript-eslint/no-deprecated` then errors on each of
 * those re-export specifiers. Prefer `tableCellClassNames.root`.
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

  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` (DECISIONS.md D15.1 / D16.2;
  // asserted by `component-has-group-marker`).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableCell.module.css and by
  // block order within it — see that file's header for the mapping back to the
  // mergeClasses() argument order, including why the focus-indicator block is written last.
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
  state.root.className = clsx(
    styles.root,
    'group/fui-table-cell',
    styles[`${layout}-root`],
    styles[`${layout}-${state.size}`],
    state.root.className,
  );

  return state;
};
