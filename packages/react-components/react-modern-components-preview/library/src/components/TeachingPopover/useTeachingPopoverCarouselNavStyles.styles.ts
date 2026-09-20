import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavSlots,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import styles from './TeachingPopoverCarouselNav.module.css';

export const teachingPopoverCarouselNavClassNames: SlotClassNames<TeachingPopoverCarouselNavSlots> = {
  root: 'fui-TeachingPopoverCarouselNav',
};

export const useTeachingPopoverCarouselNavStyles = (
  state: TeachingPopoverCarouselNavState,
): TeachingPopoverCarouselNavState => {
  state.root.className = clsx(teachingPopoverCarouselNavClassNames.root, styles.root, state.root.className);
  return state;
};
