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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    carouselNavContainerClassNames.root,
    isOverlay ? styles.overlay : styles.inline,
    isOverlay && isWide && styles['overlay-wide'],
    isExpanded && styles.expanded,
    state.root.className,
  );

  if (state.next) {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
