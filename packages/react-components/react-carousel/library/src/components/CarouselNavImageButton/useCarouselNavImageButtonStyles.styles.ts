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

import type { CarouselNavImageButtonState } from './CarouselNavImageButton.types';

import styles from './CarouselNavImageButton.module.css';

/**
 * Public identity class for CarouselNavImageButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5). The per-slot `image` key
 * was removed: there is no public class-name handle on component internals any more
 * (DECISIONS.md D16.1), and reads of it are now a compile error rather than silently
 * `undefined`.
 *
 * The marker is also load-bearing INSIDE this component: the `image` slot's selected-size
 * rule reads the root's `aria-selected` through
 * `@variant group-selected/fui-carousel-nav-image-button`, so the literal must stay
 * unconditional on the root.
 *
 * `'.' + carouselNavImageButtonClassNames.root` is an invalid SELECTOR (the `/` terminates
 * the class name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const carouselNavImageButtonClassNames: { root: string } = {
  root: 'group/fui-carousel-nav-image-button',
};

/**
 * Apply styling to the CarouselNavImageButton slots based on the state
 */
export const useCarouselNavImageButtonStyles_unstable = (
  state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires.
  //
  // Neither slot keeps a `selected && …` argument. The component renders
  // `aria-selected={selected}` on this root already, so the root reads it with the catalog
  // `selected` variant and the image reads the SAME attribute off its ancestor through
  // `group-selected/fui-carousel-nav-image-button` — the cross-boundary state read the
  // marker exists for (DECISIONS.md D15.1). No `data-selected` mirror is stamped:
  // DECISIONS.md D15.6 (resolved) makes data attributes a FALLBACK for state a selector
  // cannot otherwise reach.
  state.root.className = clsx(styles.root, 'group/fui-carousel-nav-image-button', state.root.className);

  if (state.image) {
    // The image slot carries no marker, so D15.1 does not apply to it; `styles.image` is
    // unconditional and holds `classList[0]`.
    state.image.className = clsx(styles.image, state.image.className);
  }

  return state;
};
