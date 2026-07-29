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

import type { CarouselNavContainerState } from './CarouselNavContainer.types';

import styles from './CarouselNavContainer.module.css';

/**
 * Public identity class for CarouselNavContainer.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * The `next` / `prev` / `autoplay` keys were removed with the rest of the BEM statics
 * (DECISIONS.md D16.1): there is no public class-name handle on component internals any
 * more, and reads of those keys are now a compile error instead of silently `undefined`.
 * The three `*Tooltip` keys went with them, and they were never applied to the DOM in the
 * first place — Tooltip portals its content, so it has no root to receive a className (the
 * Griffel source declared them "for type compatibility only", a requirement that disappears
 * with the `SlotClassNames<…>` type).
 *
 * `'.' + carouselNavContainerClassNames.root` is an invalid SELECTOR (the `/` terminates the
 * class name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const carouselNavContainerClassNames: { root: string } = {
  root: 'group/fui-carousel-nav-container',
};

/**
 * Apply styling to the CarouselNavContainer slots based on the state
 */
export const useCarouselNavContainerStyles_unstable = (state: CarouselNavContainerState): CarouselNavContainerState => {
  const { layout } = state;
  const isOverlay = layout === 'overlay' || layout === 'overlay-wide' || layout === 'overlay-expanded';
  const isWide = layout === 'inline-wide' || layout === 'overlay-wide';
  const isExpanded = layout === 'overlay-expanded';

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires.
  //
  // `layout` stays a JS-derived gate rather than a `data-layout` attribute: it feeds four
  // different slots and nothing reads it back off the DOM, so an attribute would add public
  // surface and widen invalidation for nothing (DECISIONS.md D15.6, resolved).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // CarouselNavContainer.module.css — see that file's header for why the three sub-slots sit
  // at `fui.components.l2` (they are react-button roots) while this root is l1.
  state.root.className = clsx(
    styles.root,
    'group/fui-carousel-nav-container',
    isOverlay ? styles.overlay : styles.inline,
    isOverlay && isWide && styles['overlay-wide'],
    isExpanded && styles.expanded,
    state.root.className,
  );

  if (state.next) {
    // The Griffel `styles.next` slice was `{}` and emitted no class; it is not reproduced as
    // an empty local (identity-only locals exist to keep a marker off `classList[0]`, and
    // this slot carries no marker). Same for `prev` / `autoplay` below.
    state.next.className = clsx(
      isWide && styles['next-wide'],
      isWide && isOverlay && styles['next-overlay-wide'],
      isExpanded && styles['next-overlay-expanded'],
      state.next.className,
    );
  }

  if (state.prev) {
    state.prev.className = clsx(
      isWide && styles['prev-wide'],
      !state.autoplay && isWide && isOverlay && styles['prev-overlay-wide'],
      isExpanded && styles['prev-overlay-expanded'],
      state.prev.className,
    );
  }

  if (state.autoplay) {
    state.autoplay.className = clsx(
      isExpanded && styles['autoplay-expanded'],
      isWide && isOverlay && styles['autoplay-overlay-wide'],
      state.autoplay.className,
    );
  }

  return state;
};
