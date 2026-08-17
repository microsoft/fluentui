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
 * The value is a class TOKEN, not a selector: use `fuiSelector(tableRowClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5).
 */
export const tableRowClassNames: { root: string } = {
  root: 'group/fui-table-row',
};

/**
 * Legacy alias for `tableRowClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableRow` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 *
 * Deliberately NOT tagged `@deprecated`, for the same reason the `*ClassNames` objects are
 * not (see react-card's CardHeader): the tag propagates to every barrel that re-exports the
 * symbol — three in this package plus the `@fluentui/react-components` umbrella, which this
 * conversion does not own — and `@typescript-eslint/no-deprecated` then errors on each of
 * those re-export specifiers. Prefer `tableRowClassNames.root`.
 */
export const tableRowClassName = tableRowClassNames.root;

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` — nwsapi's jsdom `:scope`
  // polyfill anchors on `escape(element.classList[0])` and the `/` survives that escaping
  // (DECISIONS.md D15.1 / D16.2; asserted by `component-has-group-marker`).
  //
  // The marker is also the handle by which this row's own module reaches the selection
  // cell / cell actions nested inside it — see TableRow.module.css BLOCK 6, which selects
  // THEIR markers from `fui.components.l2` (D16.3, M1).
  //
  // `styles[state.appearance]` is intentionally `undefined` for `appearance="none"`: the
  // Griffel `none` slice was `{}` and compiled to no class, so the module declares none and
  // clsx drops it.
  //
  // No `data-*` mirrors are added (DECISIONS.md D15, Tier 0 / D15.6): every condition below
  // is a JS-side gate selecting a module class, exactly as the mergeClasses arguments it
  // replaces did, and no descendant reads any of them from CSS.
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableRow.module.css and by
  // BLOCK order within it — that file is authored bucket-major rather than slice-major
  // because `.brand`/`.neutral`'s flat `background-color` would otherwise beat
  // `.root-interactive`'s hover one once `:where()` flattens both to 0-1-0. See its header.
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
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
