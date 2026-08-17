import { clsx } from 'clsx';
import type { ColorSliderState } from './ColorSlider.types';

import styles from './ColorSlider.module.css';

/**
 * Public identity class for ColorSlider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-ColorSlider`,
 * `fui-ColorSlider__rail`, `fui-ColorSlider__thumb`, `fui-ColorSlider__input`) are no longer
 * rendered and the per-slot keys are gone (DECISIONS.md D16.1); there is no public
 * class-name handle on component internals.
 *
 * `AlphaSlider` renders this component's slots through `useColorSliderStyles_unstable`, so an
 * AlphaSlider root carries THIS marker alongside its own `group/fui-alpha-slider` — exactly
 * as it used to carry both `fui-ColorSlider` and `fui-AlphaSlider` (D16.3).
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + colorSliderClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(colorSliderClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const colorSliderClassNames: { root: string } = {
  root: 'group/fui-color-slider',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-orientation` is the ONLY attribute this component stamps, and it is a genuine
 * D15.6 fallback rather than a convenience: `vertical` is one piece of React state that the
 * root, rail, thumb AND input all style off, and no native selector expresses it at any of
 * them. Mirroring it once on the root — where the `vertical` / `horizontal` catalog variants
 * read it — lets every slot's orientation block be a descendant selector inside
 * ColorSlider.module.css, and lets AlphaSlider read the same state from its own module with
 * no second mirror.
 *
 * `shape` and `channel` each gate a whole makeStyles slice and stay module classes; nothing
 * reads either across an element boundary.
 */
type ColorSliderRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the ColorSlider slots based on the state
 */
export const useColorSliderStyles_unstable = (state: ColorSliderState): ColorSliderState => {
  const { channel = 'hue', shape = 'rounded' } = state;

  const root = state.root as ColorSliderState['root'] & ColorSliderRootDataAttributes;

  root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';

  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-ColorSlider` static is gone.
  //
  // The `vertical ? styles.vertical : styles.horizontal` pair is gone from JS entirely: the
  // orientation slices for ALL FOUR slots now hang off `data-orientation` above, inside the
  // module (see its header for why they are descendant selectors rather than per-slot
  // classes).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ColorSlider.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, colorSliderClassNames.root, state.root.className);

  state.rail.className = clsx(styles.rail, styles[channel], styles[shape], state.rail.className);

  state.thumb.className = clsx(styles.thumb, state.thumb.className);

  state.input.className = clsx(styles.input, state.input.className);

  return state;
};
