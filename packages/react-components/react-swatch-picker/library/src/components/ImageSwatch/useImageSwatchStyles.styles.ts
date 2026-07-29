import { clsx } from 'clsx';
import type { ImageSwatchState } from './ImageSwatch.types';

import styles from './ImageSwatch.module.css';

/**
 * Public identity class for ImageSwatch.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-ImageSwatch`) is no
 * longer rendered; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + imageSwatchClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(imageSwatchClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const imageSwatchClassNames: { root: string } = {
  root: 'group/fui-image-swatch',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-size` carries the SCALE prop (DECISIONS.md D3). `shape` and `selected` deliberately
 * do NOT get one: both gate a whole makeStyles slice and stay module classes, and no
 * descendant needs to read them (D15.6 — a `data-*` attribute is a fallback for state that
 * a native selector cannot express at the element that needs it, never a mirror added for
 * symmetry). Note in particular that the root's own `aria-selected` is present only in grid
 * layout — `useImageSwatch_unstable` renders `aria-checked` in row layout — so neither
 * attribute is a reliable selector for selection, which is precisely why the module class
 * carries it instead.
 */
type ImageSwatchRootDataAttributes = {
  'data-size': NonNullable<ImageSwatchState['size']>;
};

/**
 * Apply styling to the ImageSwatch slots based on the state
 */
export const useImageSwatchStyles_unstable = (state: ImageSwatchState): ImageSwatchState => {
  const { size = 'medium', shape = 'square' } = state;

  const root = state.root as ImageSwatchState['root'] & ImageSwatchRootDataAttributes;

  root['data-size'] = size;

  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-ImageSwatch` static is gone.
  //
  // The marker is a literal, unhashed, GLOBAL token and this component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this swatch's state, because `styles.root` is hashed
  // and unaddressable from outside this file. `data-size` is stamped on this very element
  // above, so `@variant group-size-large/fui-image-swatch` works as-is (DECISIONS.md D15,
  // Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ImageSwatch.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for the one reset block that is
  // deliberately hoisted out of `fui.base`.
  state.root.className = clsx(
    styles.root,
    'group/fui-image-swatch',
    styles[shape],
    state.selected && styles.selected,
    state.root.className,
  );

  return state;
};
