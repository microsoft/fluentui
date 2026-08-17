import { clsx } from 'clsx';
import type { TableState } from './Table.types';

import styles from './Table.module.css';

/**
 * Table's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const tableClassNames: { root: string } = {
  root: 'group/fui-table',
};

/**
 * Legacy alias for `tableClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-Table` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 *
 * Deliberately NOT tagged `@deprecated`, for the same reason the `*ClassNames` objects are
 * not (see react-card's CardHeader): the tag propagates to every barrel that re-exports the
 * symbol — three in this package plus the `@fluentui/react-components` umbrella, which this
 * conversion does not own — and `@typescript-eslint/no-deprecated` then errors on each of
 * those re-export specifiers. Prefer `tableClassNames.root`.
 */
export const tableClassName = tableClassNames.root;

/**
 * Apply styling to the Table slots based on the state
 */
export const useTableStyles_unstable = (state: TableState): TableState => {
  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` — nwsapi's jsdom `:scope`
  // polyfill builds its anchor from `escape(element.classList[0])` and the `/` survives
  // that escaping, yielding an invalid selector and a render-time AggregateError
  // (DECISIONS.md D15.1 / D16.2; asserted by `component-has-group-marker`).
  //
  // The marker is a literal, unhashed, GLOBAL token — after D16 the SOLE public identity
  // class — and the only handle by which another module can style an element from this
  // Table's state, since `styles.*` is hashed and unaddressable from outside this file.
  //
  // No data attribute is added for `noNativeElements`: the two box models are picked in JS
  // exactly as the mergeClasses arguments they replace did, and D15.6 forbids minting a
  // `data-*` mirror where nothing needs to READ the state from CSS.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Table.module.css and by
  // block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order.
  //
  // The state-mutation pattern is PRESERVED during conversion (CONVERSION_GUIDE §3,
  // DECISIONS.md D14): the mixed-mode sibling seam and the customStyleHooks contract both
  // depend on the shared object. Its removal is a single Phase 3 sweep.
  state.root.className = clsx(
    styles.root,
    tableClassNames.root,
    state.noNativeElements ? styles['flex-root'] : styles['table-root'],
    state.root.className,
  );

  return state;
};
