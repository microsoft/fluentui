import { clsx } from 'clsx';
import type { TeachingPopoverCarouselNavState } from './TeachingPopoverCarouselNav.types';

import styles from './TeachingPopoverCarouselNav.module.css';

/**
 * TeachingPopoverCarouselNav's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverCarouselNavClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-nav',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselNavStyles_unstable = (
  state: TeachingPopoverCarouselNavState,
): TeachingPopoverCarouselNavState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, teachingPopoverCarouselNavClassNames.root, state.root.className);

  return state;
};
