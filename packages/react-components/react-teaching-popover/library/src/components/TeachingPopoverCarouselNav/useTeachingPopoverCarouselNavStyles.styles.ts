import { clsx } from 'clsx';
import type { TeachingPopoverCarouselNavState } from './TeachingPopoverCarouselNav.types';

import styles from './TeachingPopoverCarouselNav.module.css';

/**
 * TeachingPopoverCarouselNav's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverCarouselNav` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TeachingPopoverCarouselNavSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselNavClassNames.root` is invalid
 * CSS. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverCarouselNavClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-nav',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselNavStyles_unstable = (
  state: TeachingPopoverCarouselNavState,
): TeachingPopoverCarouselNavState => {
  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // TeachingPopoverCarouselNav.module.css, not by the order of these arguments.
  state.root.className = clsx(styles.root, 'group/fui-teaching-popover-carousel-nav', state.root.className);

  return state;
};
