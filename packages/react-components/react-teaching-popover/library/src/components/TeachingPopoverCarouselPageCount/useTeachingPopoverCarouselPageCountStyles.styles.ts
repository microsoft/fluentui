import { clsx } from 'clsx';
import type { TeachingPopoverCarouselPageCountState } from './TeachingPopoverCarouselPageCount.types';

import styles from './TeachingPopoverCarouselPageCount.module.css';

/**
 * TeachingPopoverCarouselPageCount's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverCarouselPageCount` BEM static is gone (D16.1), and the type has narrowed
 * from `SlotClassNames<TeachingPopoverCarouselPageCountSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselPageCountClassNames.root` is
 * invalid CSS. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverCarouselPageCountClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-page-count',
};

/**
 * Apply styling to the TeachingPopoverCarouselPageCount slots based on the state
 */
export const useTeachingPopoverCarouselPageCountStyles_unstable = (
  state: TeachingPopoverCarouselPageCountState,
): TeachingPopoverCarouselPageCountState => {
  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  state.root.className = clsx(styles.root, teachingPopoverCarouselPageCountClassNames.root, state.root.className);

  return state;
};
