import { clsx } from 'clsx';

import type { CarouselNavImageButtonState } from './CarouselNavImageButton.types';

import styles from './CarouselNavImageButton.module.css';

/**
 * Public identity class for CarouselNavImageButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5). The per-slot `image` key
 * was removed: there is no public class-name handle on component internals any more
 * (DECISIONS.md D16.1), and reads of it are now a compile error rather than silently
 * `undefined`.
 *
 * The marker is also load-bearing INSIDE this component: the `image` slot's selected-size
 * rule reads the root's `aria-selected` through
 * `@variant group-selected/fui-carousel-nav-image-button`, so the literal must stay
 * unconditional on the root.
 *
 * `'.' + carouselNavImageButtonClassNames.root` is an invalid SELECTOR (the `/` terminates
 * the class name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const carouselNavImageButtonClassNames: { root: string } = {
  root: 'group/fui-carousel-nav-image-button',
};

/**
 * Apply styling to the CarouselNavImageButton slots based on the state
 */
export const useCarouselNavImageButtonStyles_unstable = (
  state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, carouselNavImageButtonClassNames.root, state.root.className);

  if (state.image) {
    // The image slot carries no marker, so D15.1 does not apply to it; `styles.image` is
    // unconditional and holds `classList[0]`.
    state.image.className = clsx(styles.image, state.image.className);
  }

  return state;
};
