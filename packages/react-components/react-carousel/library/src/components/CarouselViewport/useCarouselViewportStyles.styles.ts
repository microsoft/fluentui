import { clsx } from 'clsx';

import type { CarouselViewportState } from './CarouselViewport.types';

import styles from './CarouselViewport.module.css';

/**
 * Public identity class for CarouselViewport.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * `'.' + carouselViewportClassNames.root` is an invalid SELECTOR (the `/` terminates the class
 * name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const carouselViewportClassNames: { root: string } = {
  root: 'group/fui-carousel-viewport',
};

/**
 * Apply styling to the CarouselViewport slots based on the state
 */
export const useCarouselViewportStyles_unstable = (state: CarouselViewportState): CarouselViewportState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, carouselViewportClassNames.root, state.root.className);

  return state;
};
