'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterButtonSlots,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import styles from './TeachingPopoverCarouselFooterButton.module.css';

export const teachingPopoverCarouselFooterButtonClassNames: SlotClassNames<TeachingPopoverCarouselFooterButtonSlots> = {
  root: 'fui-TeachingPopoverCarouselFooterButton',
};

/**
 * Apply styling to the TeachingPopoverCarouselFooterButton slots based on the state
 */
export const useTeachingPopoverCarouselFooterButtonStyles_unstable = (
  state: TeachingPopoverCarouselFooterButtonState,
): TeachingPopoverCarouselFooterButtonState => {
  'use no memo'; // justified: compiler would optimize useTeachingPopoverCarouselFooterButtonStyles_unstable — manual opt-out to preserve runtime behavior

  const { navType, popoverAppearance } = state;

  // Apply underlying fluent Button styles
  state = {
    ...state,
    ...useButtonStyles_unstable(state),
  };

  state.root.className = clsx(
    teachingPopoverCarouselFooterButtonClassNames.root,
    styles.root,
    navType === 'prev' && popoverAppearance === 'brand' && styles.brandPrevious,
    navType === 'next' && popoverAppearance === 'brand' && styles.brandNext,
    state.root.className,
  );

  return state;
};
