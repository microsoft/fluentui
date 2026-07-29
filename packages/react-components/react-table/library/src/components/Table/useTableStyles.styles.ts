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
import type { TableState } from './Table.types';

import styles from './Table.module.css';

/**
 * Table's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Table` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TableSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + tableClassNames.root` is invalid CSS. Use
 * `fuiSelector(tableClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers.
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
    'group/fui-table',
    state.noNativeElements ? styles['flex-root'] : styles['table-root'],
    state.root.className,
  );

  return state;
};
