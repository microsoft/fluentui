import { clsx } from 'clsx';
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

import styles from './TeachingPopoverCarousel.module.css';

/**
 * TeachingPopoverCarousel's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverCarousel` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TeachingPopoverCarouselSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselClassNames.root` is invalid CSS.
 * Use `fuiSelector(teachingPopoverCarouselClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5); `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverCarouselClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselStyles_unstable = (
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselState => {
  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is the module's IDENTITY-ONLY local — this component still has no
  // styles of its own ("Todo: Page change animation & styles" in the Griffel source) — and it
  // exists precisely so index 0 is always a hashed, selector-safe `fuicm-*` token, keeping the
  // marker off `classList[0]` where nwsapi's `:scope` polyfill would throw on its `/` under
  // jsdom (D15.1). See TeachingPopoverCarousel.module.css before deleting it.
  state.root.className = clsx(styles.root, 'group/fui-teaching-popover-carousel', state.root.className);

  return state;
};
