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
import type { TableBodyState } from './TableBody.types';

import styles from './TableBody.module.css';

/**
 * TableBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TableBody` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TableBodySlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: use `fuiSelector(tableBodyClassNames.root)`
 * from `@fluentui/react-utilities` (D16.5).
 */
export const tableBodyClassNames: { root: string } = {
  root: 'group/fui-table-body',
};

/**
 * Legacy alias for `tableBodyClassNames.root`, retained and RE-POINTED at the group marker rather
 * than deleted or left holding the old `fui-TableBody` string (D16.5): deleting a published
 * constant breaks consumers at build time, while a stub carrying the retired static would
 * leave them compiling and silently selecting nothing.
 *
 * Deliberately NOT tagged `@deprecated`, for the same reason the `*ClassNames` objects are
 * not (see react-card's CardHeader): the tag propagates to every barrel that re-exports the
 * symbol — three in this package plus the `@fluentui/react-components` umbrella, which this
 * conversion does not own — and `@typescript-eslint/no-deprecated` then errors on each of
 * those re-export specifiers. Prefer `tableBodyClassNames.root`.
 */
export const tableBodyClassName = tableBodyClassNames.root;

/**
 * Apply styling to the TableBody slots based on the state
 */
export const useTableBodyStyles_unstable = (state: TableBodyState): TableBodyState => {
  // Module class first, named group marker second, consumer className last. The leading
  // token here is the layout class, which is safe to lead with because the two branches
  // are picked by a TERNARY — one of them is always emitted, so the marker can never end
  // up at `classList[0]` where nwsapi's jsdom `:scope` polyfill would throw on the `/`
  // (DECISIONS.md D15.1 / D16.2; asserted by `component-has-group-marker`). An
  // identity-only `.root` local (D16.2's fix for the six roots that had no unconditional
  // class) is therefore unnecessary.
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableBody.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order.
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
  state.root.className = clsx(
    state.noNativeElements ? styles['flex-root'] : styles['table-root'],
    'group/fui-table-body',
    state.root.className,
  );

  return state;
};
