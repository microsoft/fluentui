import { clsx } from 'clsx';
import type {
  TeachingPopoverCarouselNavSlots,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverCarouselNav.module.css';

export const teachingPopoverCarouselNavClassNames: SlotClassNames<TeachingPopoverCarouselNavSlots> = {
  root: 'fui-TeachingPopoverCarouselNav',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselNavStyles_unstable = (
  state: TeachingPopoverCarouselNavState,
): TeachingPopoverCarouselNavState => {
  state.root.className = clsx(teachingPopoverCarouselNavClassNames.root, styles.root, state.root.className);

  return state;
};
