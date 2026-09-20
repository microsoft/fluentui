import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselPageCountSlots,
  TeachingPopoverCarouselPageCountState,
} from './TeachingPopoverCarouselPageCount.types';
import styles from './TeachingPopoverCarouselPageCount.module.css';

export const teachingPopoverCarouselPageCountClassNames: SlotClassNames<TeachingPopoverCarouselPageCountSlots> = {
  root: 'fui-TeachingPopoverCarouselPageCount',
};

export const useTeachingPopoverCarouselPageCountStyles = (
  state: TeachingPopoverCarouselPageCountState,
): TeachingPopoverCarouselPageCountState => {
  state.root.className = clsx(teachingPopoverCarouselPageCountClassNames.root, styles.root, state.root.className);
  return state;
};
