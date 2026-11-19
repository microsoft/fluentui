import { clsx } from 'clsx';
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

export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  state.root.className = clsx(
    ratingItemClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.color],
    styles[state.appearance],
    state.halfValueInput && styles.half,
    state.iconFillWidth === 0.5 && styles.halfIcon,
    state.root.className,
  );
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
      styles.fullValueInput,
      state.fullValueInput.className,
    );
  }
  if (state.selectedIcon) {
    state.selectedIcon.className = clsx(
      ratingItemClassNames.selectedIcon,
      styles.indicator,
      styles.selectedIcon,
      state.selectedIcon.className,
    );
  }
  if (state.unselectedIcon) {
    state.unselectedIcon.className = clsx(
      ratingItemClassNames.unselectedIcon,
      styles.indicator,
      styles.unselectedIcon,
      state.unselectedIcon.className,
    );
  }
  return state;
};
