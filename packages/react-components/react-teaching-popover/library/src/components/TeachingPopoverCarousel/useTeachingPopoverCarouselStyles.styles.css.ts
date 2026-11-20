import { clsx } from 'clsx';
import type { TeachingPopoverCarouselSlots, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverCarousel.module.css';

export const teachingPopoverCarouselClassNames: SlotClassNames<TeachingPopoverCarouselSlots> = {
  root: 'fui-TeachingPopoverCarousel',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselStyles_unstable = (
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselState => {
  state.root.className = clsx(teachingPopoverCarouselClassNames.root, styles.root, state.root.className);

  return state;
};
