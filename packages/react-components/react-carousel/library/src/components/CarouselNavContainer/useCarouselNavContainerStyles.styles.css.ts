import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavContainerSlots, CarouselNavContainerState } from './CarouselNavContainer.types';
import styles from './CarouselNavContainer.module.css';

export const carouselNavContainerClassNames: SlotClassNames<CarouselNavContainerSlots> = {
  root: 'fui-CarouselNavContainer',
  next: 'fui-CarouselNavContainer__next',
  prev: 'fui-CarouselNavContainer__prev',
  autoplay: 'fui-CarouselNavContainer__autoplay',
  /* Tooltip classNames are listed for type compatibility only (cannot assign root className to portal)
   * Use 'content' slot to style Tooltip content instead
   */
  nextTooltip: 'fui-CarouselNavContainer__nextTooltip',
  prevTooltip: 'fui-CarouselNavContainer__prevTooltip',
  autoplayTooltip: 'fui-CarouselNavContainer__autoplayTooltip',
};

/**
 * Apply styling to the CarouselNavContainer slots based on the state
 */
export const useCarouselNavContainerStyles_unstable = (state: CarouselNavContainerState): CarouselNavContainerState => {
  const { layout } = state;

  state.root.className = clsx(
    carouselNavContainerClassNames.root,
    styles.root,
    styles[layout ?? 'inline'],
    state.autoplay && styles.hasAutoplay,
    state.root.className,
  );

  if (state.next) {
    state.next.className = clsx(carouselNavContainerClassNames.next, styles.next, state.next.className);
  }
  if (state.prev) {
    state.prev.className = clsx(carouselNavContainerClassNames.prev, styles.prev, state.prev.className);
  }
  if (state.autoplay) {
    state.autoplay.className = clsx(carouselNavContainerClassNames.autoplay, styles.autoplay, state.autoplay.className);
  }
  return state;
};
