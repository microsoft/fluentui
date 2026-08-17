import { clsx } from 'clsx';
import type { ColorSwatchState } from './ColorSwatch.types';

import styles from './ColorSwatch.module.css';

/**
 * Public identity class for ColorSwatch.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-ColorSwatch`,
 * `fui-ColorSwatch__icon`, `fui-ColorSwatch__disabledIcon`) are no longer rendered and the
 * per-slot keys are gone (DECISIONS.md D16.1); there is no public class-name handle on
 * component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + colorSwatchClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(colorSwatchClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const colorSwatchClassNames: { root: string } = {
  root: 'group/fui-color-swatch',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-size` carries the SCALE prop (DECISIONS.md D3) and is the ONLY attribute this
 * component stamps. Three states deliberately do NOT get one:
 *
 * - `disabled` — the root is a `<button>` and `useColorSwatch_unstable` passes `disabled`
 *   straight through, so `@variant disabled` reads the native attribute at the element that
 *   needs it (D15.6).
 * - `shape` and `selected` — each gates a whole makeStyles slice and stays a module class;
 *   no descendant reads either. (Selection is NOT expressible natively here: the root
 *   renders `aria-selected` in grid layout but `aria-checked` in row layout, which is
 *   exactly why a class carries it rather than an `aria-*` selector.)
 *
 * The icon slots carry no attributes either: their per-size font-size is selected from this
 * root's `data-size` through a descendant selector inside ColorSwatch.module.css.
 */
type ColorSwatchRootDataAttributes = {
  'data-size': NonNullable<ColorSwatchState['size']>;
};

/**
 * Apply styling to the ColorSwatch slots based on the state
 */
export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  const { size = 'medium', shape = 'square' } = state;

  const root = state.root as ColorSwatchState['root'] & ColorSwatchRootDataAttributes;

  root['data-size'] = size;

  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-ColorSwatch` static is gone.
  //
  // The marker is a literal, unhashed, GLOBAL token and this component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this swatch's state, because `styles.root` is hashed
  // and unaddressable from outside this file. `data-size` is stamped on this very element
  // above, so `@variant group-size-large/fui-color-swatch` works as-is (DECISIONS.md D15,
  // Tier 0).
  //
  // `smallerSelectedStyles` is gone from JS: the `size === 'small' || 'extra-small'` gate on
  // the `selectedSmall` slice is now the shared `size-small-or-below` variant reading the
  // `data-size` attribute above, nested inside `.selected` in the module.
  //
  // Cascade priority is decided by the `@layer fui.*` order in ColorSwatch.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for the one reset block that is
  // deliberately hoisted out of `fui.base`.
  state.root.className = clsx(
    styles.root,
    colorSwatchClassNames.root,
    styles[shape],
    state.selected && styles.selected,
    state.root.className,
  );

  if (state.disabled && state.disabledIcon) {
    // `iconStyles[size]` is not applied here any more — the module selects the icon's
    // font-size from the ROOT's `data-size` (see the module's icon block).
    state.disabledIcon.className = clsx(styles.icon, styles['disabled-icon'], state.disabledIcon.className);
  }

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
