import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';
import styles from './RatingItem.module.css';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  selectedIcon: 'fui-RatingItem__selectedIcon',
  unselectedIcon: 'fui-RatingItem__unselectedIcon',
  halfValueInput: 'fui-RatingItem__halfValueInput',
  fullValueInput: 'fui-RatingItem__fullValueInput',
};

export const useRatingItemStyles = (state: RatingItemState): RatingItemState => {
  state.root.className = clsx(ratingItemClassNames.root, styles.root, state.root.className);

  if (state.halfValueInput) {
    state.halfValueInput.className = clsx(
      ratingItemClassNames.halfValueInput,
      styles.input,
      styles.halfValueInput,
      state.halfValueInput.className,
    );
  }

  if (state.fullValueInput) {
    state.fullValueInput.className = clsx(
      ratingItemClassNames.fullValueInput,
      styles.input,
      state.halfValueInput && styles.fullValueInput,
      state.fullValueInput.className,
    );
  }

  if (state.unselectedIcon) {
    state.unselectedIcon.className = clsx(
      ratingItemClassNames.unselectedIcon,
      styles.indicator,
      styles.unselectedIcon,
      state.iconFillWidth === 0.5 && styles.upperHalf,
      state.unselectedIcon.className,
    );
  }

  if (state.selectedIcon) {
    state.selectedIcon.className = clsx(
      ratingItemClassNames.selectedIcon,
      styles.indicator,
      styles.selectedIcon,
      state.iconFillWidth === 0.5 && styles.lowerHalf,
      state.selectedIcon.className,
    );
  }

  return state;
};
