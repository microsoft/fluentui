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

import type { CarouselNavButtonState } from './CarouselNavButton.types';

import styles from './CarouselNavButton.module.css';

/**
 * Public identity class for CarouselNavButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * `'.' + carouselNavButtonClassNames.root` is an invalid SELECTOR (the `/` terminates the
 * class name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5). This
 * package's own Cypress suite (`Carousel.cy.tsx`) does exactly that.
 */
export const carouselNavButtonClassNames: { root: string } = {
  root: 'group/fui-carousel-nav-button',
};

/**
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  const { appearance } = state;

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires; the `fui-CarouselNavButton`
  // static that used to hold that position was removed in the D16 sweep.
  //
  // Two of the four Griffel arguments have NO counterpart here, by design:
  //
  //   • `selected ? styles.rootSelected : styles.rootUnselected` — the component already
  //     renders `aria-selected={selected}` on this very element (`useCarouselNavButton.ts`),
  //     so both branches are expressed in CSS as the catalog `selected` / `not-selected`
  //     variants. No `data-selected` mirror is stamped: DECISIONS.md D15.6 (resolved) makes
  //     data attributes a FALLBACK for state a selector cannot otherwise reach.
  //   • `!selected && appearance === 'brand' && styles.unselectedBrand` — the `!selected`
  //     half is the same `not-selected` variant, nested inside `.brand` in the module.
  //
  // `appearance` stays a JS-gated module class: it is a LOOK prop (DECISIONS.md D3), not a
  // state, and it is read off `CarouselNavContext` rather than the DOM.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CarouselNavButton.module.css,
  // not by the order of these arguments — but that file's BLOCK order reproduces the
  // mergeClasses argument order exactly, and one slice is deliberately SPLIT around the
  // forced-colors rules to reproduce Griffel's media-bucket-vs-specificity outcome. Read its
  // header before reordering anything there.
  state.root.className = clsx(
    styles.root,
    'group/fui-carousel-nav-button',
    appearance === 'brand' && styles.brand,
    state.root.className,
  );

  return state;
};
