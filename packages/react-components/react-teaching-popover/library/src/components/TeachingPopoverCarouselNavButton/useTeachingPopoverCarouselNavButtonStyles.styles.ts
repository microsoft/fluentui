import { clsx } from 'clsx';
import type { TeachingPopoverCarouselNavButtonState } from './TeachingPopoverCarouselNavButton.types';

import styles from './TeachingPopoverCarouselNavButton.module.css';

/**
 * TeachingPopoverCarouselNavButton's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    teachingPopoverCarouselNavButtonClassNames.root,
    appearance === 'brand' && styles.brand,
    state.root.className,
  );

  return state;
};
