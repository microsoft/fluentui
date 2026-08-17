import { clsx } from 'clsx';
import type { TableCellActionsState } from './TableCellActions.types';

import styles from './TableCellActions.module.css';

/**
 * TableCellActions' public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(tableCellActionsClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const tableCellActionsClassNames: { root: string } = {
  root: 'group/fui-table-cell-actions',
};

/**
 * Apply styling to the TableCellActions slots based on the state
 */
export const useTableCellActionsStyles_unstable = (state: TableCellActionsState): TableCellActionsState => {
  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` (DECISIONS.md D15.1 / D16.2;
  // asserted by `component-has-group-marker`).
  //
  // `visible` stays a JS-gated module class rather than a `data-visible` attribute: it
  // selects one slice exactly as the mergeClasses argument it replaces did, and nothing
  // outside this hook reads it (DECISIONS.md D15.6 — data attributes are a fallback for
  // state CSS cannot otherwise reach, not a default).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableCellActions.module.css
  // and by block order within it, not by the order of these arguments.
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
  state.root.className = clsx(
    styles.root,
    tableCellActionsClassNames.root,
    state.visible && styles.visible,
    state.root.className,
  );

  return state;
};
