'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so the
 * directive is genuinely required and the rule does not flag it. (Adding a suppression anyway
 * would trip `--report-unused-disable-directives`.) Converted leaf hooks in this package call
 * nothing and carry no directive at all.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';

import type { CarouselButtonState } from './CarouselButton.types';

/*
 * `@fluentui/react-button` is imported ABOVE this module, deliberately. The generated ESM
 * class map for a `*.module.css` carries a side-effect import of its package's
 * `dist/styles.css`, so import order here is also stylesheet order: react-button's sheet is
 * evaluated first and this package's second. Every rule in CarouselButton.module.css is
 * layered (`fui.components.l2`), so nothing DEPENDS on that order — but keeping it matching
 * the composition direction costs nothing.
 */
import styles from './CarouselButton.module.css';

/**
 * Public identity class for CarouselButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5). The per-slot `icon` key was
 * removed (DECISIONS.md D16.1); it only ever carried a static class this hook no longer
 * applies, so nothing that used to match stops matching — reads of it are now a compile error
 * instead of silently `undefined`.
 *
 * `'.' + carouselButtonClassNames.root` is an invalid SELECTOR (the `/` terminates the class
 * name); `useCarouselButton.tsx` builds its `querySelectorAll` argument with
 * `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5), and consumers must do the same.
 */
export const carouselButtonClassNames: { root: string } = {
  root: 'group/fui-carousel-button',
};

/**
 * Apply styling to the CarouselButton slots based on the state
 */
export const useCarouselButtonStyles_unstable = (state: CarouselButtonState): CarouselButtonState => {
  'use no memo'; // justified: compiler would optimize useCarouselButtonStyles_unstable — manual opt-out to preserve runtime behavior

  state = {
    ...state,
    ...useButtonStyles_unstable(state),
  };

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires; the `fui-CarouselButton`
  // static that used to hold that position was removed in the D16 sweep.
  //
  // This root ends up carrying TWO markers, which is correct and not a duplication:
  // `useButtonStyles_unstable` above stamps `group/fui-button` on the same element, because
  // the element genuinely IS both a Button and a CarouselButton. (This is why the component
  // declares the whole marker set in `testOptions['has-group-marker']` — see
  // CarouselButton.test.tsx.)
  //
  // The composition ORDER is preserved verbatim — Button's hook first, this hook's classes
  // prepended after — because it is also what keeps `state.root.className` (which now ends
  // with the CONSUMER's className, appended last by Button's own clsx) at the end of the
  // rendered class attribute.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CarouselButton.module.css,
  // NOT by these arguments. Read that file's header before adding anything here: under
  // Griffel this hook's classes were Button's EARLIER mergeClasses argument, so Button won
  // every property collision, and two of the four Griffel declarations were provably deleted
  // from the DOM and are deliberately not reproduced.
  state.root.className = clsx(styles.root, 'group/fui-carousel-button', state.root.className);

  return state;
};
