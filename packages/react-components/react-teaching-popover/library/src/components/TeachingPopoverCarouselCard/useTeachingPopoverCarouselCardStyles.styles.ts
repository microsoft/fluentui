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
import type { TeachingPopoverCarouselCardState } from './TeachingPopoverCarouselCard.types';

import styles from './TeachingPopoverCarouselCard.module.css';

/**
 * TeachingPopoverCarouselCard's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverCarouselCard` BEM static is gone (D16.1), and the type has narrowed
 * from `SlotClassNames<TeachingPopoverCarouselCardSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselCardClassNames.root` is invalid
 * CSS. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverCarouselCardClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-card',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselCardStyles_unstable = (
  state: TeachingPopoverCarouselCardState,
): TeachingPopoverCarouselCardState => {
  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is the module's IDENTITY-ONLY local — this component has no styles
  // of its own — and it exists precisely so index 0 is always a hashed, selector-safe
  // `fuicm-*` token, keeping the marker off `classList[0]` where nwsapi's `:scope` polyfill
  // would throw on its `/` under jsdom (D15.1). See TeachingPopoverCarouselCard.module.css
  // before deleting it.
  state.root.className = clsx(styles.root, 'group/fui-teaching-popover-carousel-card', state.root.className);

  return state;
};
