import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselPageCountSlots,
  TeachingPopoverCarouselPageCountState,
} from './TeachingPopoverCarouselPageCount.types';
import styles from './TeachingPopoverCarouselPageCount.module.css';

export const teachingPopoverCarouselPageCountClassNames: SlotClassNames<TeachingPopoverCarouselPageCountSlots> = {
  root: 'fui-TeachingPopoverCarouselPageCount',
};

/**
 * Apply styling to the TeachingPopoverCarouselPageCount slots based on the state
 */
export const useTeachingPopoverCarouselPageCountStyles_unstable = (
  state: TeachingPopoverCarouselPageCountState,
): TeachingPopoverCarouselPageCountState => {
  state.root.className = clsx(teachingPopoverCarouselPageCountClassNames.root, styles.root, state.root.className);

  return state;
};
