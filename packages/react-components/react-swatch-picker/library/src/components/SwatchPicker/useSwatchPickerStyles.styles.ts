import { clsx } from 'clsx';
import type { SwatchPickerState } from './SwatchPicker.types';

import styles from './SwatchPicker.module.css';

/**
 * Public identity class for SwatchPicker.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-SwatchPicker`) is no
 * longer rendered; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + swatchPickerClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(swatchPickerClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const swatchPickerClassNames: { root: string } = {
  root: 'group/fui-swatch-picker',
};

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-SwatchPicker` static is gone.
  //
  // The marker is a literal, unhashed, GLOBAL token and this component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this picker's state, because `styles.root` is hashed
  // and unaddressable from outside this file.
  //
  // No state mirrors are needed (DECISIONS.md D15, Tier 0 / D15.6). `layout` and `spacing`
  // are read by this element's own rules only: SwatchPickerRow and the three Swatch
  // components receive `size` / `shape` / `spacing` / `isGrid` through the SwatchPicker
  // React context, so no descendant rule has to reach the picker's DOM for them.
  //
  // Cascade priority is decided by the `@layer fui.*` order in SwatchPicker.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    styles.root,
    swatchPickerClassNames.root,
    state.isGrid ? styles.grid : styles.row,
    state.spacing === 'small' ? styles['spacing-small'] : styles['spacing-medium'],
    state.root.className,
  );

  return state;
};
