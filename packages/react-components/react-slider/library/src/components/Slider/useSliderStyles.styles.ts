import { clsx } from 'clsx';
import type { SliderState } from './Slider.types';

import styles from './Slider.module.css';

/**
 * Public identity class for Slider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`rail`, `thumb`, `input`) were removed together
 * with the `fui-Slider__*` BEM statics (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * NOTE: this is NOT the package's runtime-styling contract. The `--fui-Slider*` custom
 * properties exported from `Slider.constants.ts` (`sliderCSSVars`) are unchanged and remain the
 * supported way to retheme a Slider — they are written by JS as inline styles and read by
 * `Slider.module.css` with `var()`. `@fluentui/react-color-picker` depends on those exact
 * names.
 */
export const sliderClassNames: { root: string } = {
  root: 'group/fui-slider',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * • `data-disabled` is a PRESENCE flag written `state.disabled || undefined` — never `|| false`,
 * because the catalog's `disabled` variant is an attribute-presence selector and
 * `data-disabled="false"` would still match `[data-disabled]`.
 */
type SliderRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size'?: SliderState['size'];
  'data-disabled'?: true;
};

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles_unstable = (state: SliderState): SliderState => {
  const root = state.root as SliderState['root'] & SliderRootDataAttributes;

  root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';
  root['data-size'] = state.size;
  root['data-disabled'] = state.disabled || undefined;

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `fui-Slider*` BEM
  // statics that used to lead these lists are gone (D16.1); the marker is Slider's sole public
  // identity CLASS now. It is a literal, unhashed, GLOBAL token: it is the only handle by which
  // another module — in this package or any other — can style an element from this Slider's
  // state, because `styles.root` is hashed and unaddressable from outside this file.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Slider.module.css and by block
  // order within it, not by the order of these arguments — see that file's header for the
  // mapping back to the mergeClasses() argument order this replaces, and for why every rule
  // sits at altitude `fui.components.l1`.
  //
  // The state mutation below is preserved deliberately (DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep). The Griffel original's
  // `eslint-disable-next-line react-hooks/immutability` comments are dropped because the rule
  // no longer reports here — same as the react-divider and react-switch conversions.
  state.root.className = clsx(styles.root, sliderClassNames.root, state.root.className);

  state.rail.className = clsx(styles.rail, state.rail.className);

  state.thumb.className = clsx(styles.thumb, state.thumb.className);

  state.input.className = clsx(styles.input, state.input.className);

  return state;
};
