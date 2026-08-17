import { clsx } from 'clsx';

import type { CarouselState } from './Carousel.types';

import styles from './Carousel.module.css';

/**
 * Public identity class for Carousel.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + carouselClassNames.root` is a `SyntaxError`. Build selectors with
 * `fuiSelector(carouselClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * token-taking DOM APIs need no escaping — `components/pointerEvents.ts` calls
 * `classList.contains(carouselClassNames.root)` and is correct unchanged.
 */
export const carouselClassNames: { root: string } = {
  root: 'group/fui-carousel',
};

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCarouselStyles_unstable = (state: CarouselState): CarouselState => {
  const { appearance } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    carouselClassNames.root,
    appearance === 'elevated' && styles.elevated,
    state.root.className,
  );

  return state;
};
