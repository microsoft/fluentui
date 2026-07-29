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
import type { TableCellActionsState } from './TableCellActions.types';

import styles from './TableCellActions.module.css';

/**
 * TableCellActions' public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target, and
 * it is the handle TableRow / DataGridRow use to reveal these actions on row interaction
 * (D16.3, M1 — see TableCellActions.module.css). The `fui-TableCellActions` BEM static is
 * gone (D16.1) and the type has narrowed from `SlotClassNames<TableCellActionsSlots>` to
 * `{ root: string }`.
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
    'group/fui-table-cell-actions',
    state.visible && styles.visible,
    state.root.className,
  );

  return state;
};
