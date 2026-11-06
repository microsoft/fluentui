import { clsx } from 'clsx';
import type {
  TeachingPopoverCarouselCardSlots,
  TeachingPopoverCarouselCardState,
} from './TeachingPopoverCarouselCard.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverCarouselCard.module.css';

export const teachingPopoverCarouselCardClassNames: SlotClassNames<TeachingPopoverCarouselCardSlots> = {
  root: 'fui-TeachingPopoverCarouselCard',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselCardStyles_unstable = (
  state: TeachingPopoverCarouselCardState,
): TeachingPopoverCarouselCardState => {
  state.root.className = clsx(teachingPopoverCarouselCardClassNames.root, styles.root, state.root.className);

  return state;
};
