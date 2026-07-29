import { clsx } from 'clsx';

import type { CarouselNavState } from './CarouselNav.types';

import styles from './CarouselNav.module.css';

/**
 * Public identity class for CarouselNav.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * `'.' + carouselNavClassNames.root` is an invalid SELECTOR (the `/` terminates the class
 * name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const carouselNavClassNames: { root: string } = {
  root: 'group/fui-carousel-nav',
};

/**
 * Apply styling to the CarouselNav slots based on the state
 */
export const useCarouselNavStyles_unstable = (state: CarouselNavState): CarouselNavState => {
  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires.
  state.root.className = clsx(styles.root, 'group/fui-carousel-nav', state.root.className);

  return state;
};
