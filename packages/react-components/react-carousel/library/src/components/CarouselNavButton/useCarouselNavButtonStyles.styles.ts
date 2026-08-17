import { clsx } from 'clsx';

import type { CarouselNavButtonState } from './CarouselNavButton.types';

import styles from './CarouselNavButton.module.css';

/**
 * Public identity class for CarouselNavButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * `'.' + carouselNavButtonClassNames.root` is an invalid SELECTOR (the `/` terminates the
 * class name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5). This
 * package's own Cypress suite (`Carousel.cy.tsx`) does exactly that.
 */
export const carouselNavButtonClassNames: { root: string } = {
  root: 'group/fui-carousel-nav-button',
};

/**
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  const { appearance } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    carouselNavButtonClassNames.root,
    appearance === 'brand' && styles.brand,
    state.root.className,
  );

  return state;
};
