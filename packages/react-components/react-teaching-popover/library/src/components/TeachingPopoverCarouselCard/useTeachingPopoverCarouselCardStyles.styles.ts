import { clsx } from 'clsx';
import type { TeachingPopoverCarouselCardState } from './TeachingPopoverCarouselCard.types';

import styles from './TeachingPopoverCarouselCard.module.css';

/**
 * TeachingPopoverCarouselCard's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
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
  state.root.className = clsx(styles.root, teachingPopoverCarouselCardClassNames.root, state.root.className);

  return state;
};
