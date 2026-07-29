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
import type { EmptySwatchState } from './EmptySwatch.types';

import styles from './EmptySwatch.module.css';

/**
 * Public identity class for EmptySwatch.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-EmptySwatch`) is no
 * longer rendered; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + emptySwatchClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(emptySwatchClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const emptySwatchClassNames: { root: string } = {
  root: 'group/fui-empty-swatch',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-size` carries the SCALE prop (DECISIONS.md D3) — it is the only state this
 * component has that CSS must see. `shape` is a look prop and rides a module class, and
 * there is no boolean state to mirror, so nothing else is stamped (D15.6: a `data-*`
 * attribute is a fallback for state no native selector expresses at the element that needs
 * it, never a mirror added for symmetry).
 */
type EmptySwatchRootDataAttributes = {
  'data-size': NonNullable<EmptySwatchState['size']>;
};

/**
 * Apply styling to the EmptySwatch slots based on the state
 */
export const useEmptySwatchStyles_unstable = (state: EmptySwatchState): EmptySwatchState => {
  const size = state.size ?? 'medium';
  const shape = state.shape ?? 'square';

  const root = state.root as EmptySwatchState['root'] & EmptySwatchRootDataAttributes;

  root['data-size'] = size;

  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-EmptySwatch` static is gone.
  //
  // The marker is a literal, unhashed, GLOBAL token and this component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this swatch's state, because `styles.root` is hashed
  // and unaddressable from outside this file. `data-size` is stamped on this very element
  // above, so `@variant group-size-large/fui-empty-swatch` works as-is (DECISIONS.md D15,
  // Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in EmptySwatch.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-empty-swatch', styles[shape], state.root.className);

  return state;
};
