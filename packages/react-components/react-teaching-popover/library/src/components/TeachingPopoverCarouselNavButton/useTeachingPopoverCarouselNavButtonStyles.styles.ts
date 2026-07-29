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
import type { TeachingPopoverCarouselNavButtonState } from './TeachingPopoverCarouselNavButton.types';

import styles from './TeachingPopoverCarouselNavButton.module.css';

/**
 * TeachingPopoverCarouselNavButton's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverCarouselNavButton` BEM static is gone (D16.1), and the type has narrowed
 * from `SlotClassNames<TeachingPopoverCarouselNavButtonSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselNavButtonClassNames.root` is
 * invalid CSS. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverCarouselNavButtonClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-nav-button',
};

/**
 * Apply styling to the TeachingPopoverCarouselNavButton slots based on the state
 */
export const useTeachingPopoverCarouselNavButtonStyles_unstable = (
  state: TeachingPopoverCarouselNavButtonState,
): TeachingPopoverCarouselNavButtonState => {
  const { appearance } = state;

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // The Griffel hook's `isSelected ? rootSelected : rootUnselected` and
  // `isSelected ? rootBrand : rootBrandUnselected` branches are GONE from the JS: the element
  // already renders `aria-selected`, so both branches are expressed in the module as the
  // catalog's `selected` / `not-selected` variants (D15.6, resolved — a `data-selected` mirror
  // would only widen invalidation without closing the ARIA half). `appearance` stays a JS-side
  // gate because it is a LOOK prop selecting a module class (D3).
  //
  // Cascade priority is decided by the `@layer fui.*` order and by file position inside
  // TeachingPopoverCarouselNavButton.module.css — see that file's header for the mapping back
  // to the mergeClasses() argument order, including the two blocks whose position reproduces
  // Griffel's `@supports` / `@media` bucket ordering.
  state.root.className = clsx(
    styles.root,
    'group/fui-teaching-popover-carousel-nav-button',
    appearance === 'brand' && styles.brand,
    state.root.className,
  );

  return state;
};
