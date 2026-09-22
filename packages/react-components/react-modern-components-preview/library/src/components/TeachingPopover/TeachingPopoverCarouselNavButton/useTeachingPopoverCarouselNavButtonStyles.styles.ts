import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavButtonSlots,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import styles from './TeachingPopoverCarouselNavButton.module.css';

export const teachingPopoverCarouselNavButtonClassNames: SlotClassNames<TeachingPopoverCarouselNavButtonSlots> = {
  root: 'fui-TeachingPopoverCarouselNavButton',
};

export const useTeachingPopoverCarouselNavButtonStyles = (
  state: TeachingPopoverCarouselNavButtonState,
): TeachingPopoverCarouselNavButtonState => {
  state.root.className = clsx(teachingPopoverCarouselNavButtonClassNames.root, styles.root, state.root.className);
  return state;
};
