import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavButtonSlots,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import styles from './TeachingPopoverCarouselNavButton.module.css';

export const teachingPopoverCarouselNavButtonClassNames: SlotClassNames<TeachingPopoverCarouselNavButtonSlots> = {
  root: 'fui-TeachingPopoverCarouselNavButton',
};

/**
 * Apply styling to the TeachingPopoverCarouselNavButton slots based on the state
 */
export const useTeachingPopoverCarouselNavButtonStyles_unstable = (
  state: TeachingPopoverCarouselNavButtonState,
): TeachingPopoverCarouselNavButtonState => {
  const { appearance, isSelected } = state;

  state.root.className = clsx(
    teachingPopoverCarouselNavButtonClassNames.root,
    styles.root,
    isSelected ? styles.selected : styles.unselected,
    appearance === 'brand' && styles.brand,
    state.root.className,
  );

  return state;
};
