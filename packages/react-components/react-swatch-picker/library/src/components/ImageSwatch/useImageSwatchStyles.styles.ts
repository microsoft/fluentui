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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    imageSwatchClassNames.root,
    styles[shape],
    state.selected && styles.selected,
    state.root.className,
  );

  return state;
};
