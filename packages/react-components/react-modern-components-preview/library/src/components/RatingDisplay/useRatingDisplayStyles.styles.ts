import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingDisplaySlots, RatingDisplayState } from './RatingDisplay.types';
import styles from './RatingDisplay.module.css';

export const ratingDisplayClassNames: SlotClassNames<RatingDisplaySlots> = {
  root: 'fui-RatingDisplay',
  valueText: 'fui-RatingDisplay__valueText',
  countText: 'fui-RatingDisplay__countText',
};

export const useRatingDisplayStyles = (state: RatingDisplayState): RatingDisplayState => {
  state.root.className = clsx(ratingDisplayClassNames.root, styles.root, state.root.className);

  if (state.valueText) {
    state.valueText.className = clsx(
      ratingDisplayClassNames.valueText,
      styles.label,
      styles.valueText,
      state.valueText.className,
    );
  }

  if (state.countText) {
    state.countText.className = clsx(
      ratingDisplayClassNames.countText,
      styles.label,
      styles.countText,
      state.countText.className,
    );
  }

  return state;
};
