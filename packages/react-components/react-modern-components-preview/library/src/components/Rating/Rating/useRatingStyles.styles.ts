import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';
import styles from './Rating.module.css';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
};

export const useRatingStyles = (state: RatingState): RatingState => {
  state.root.className = clsx(ratingClassNames.root, styles.root, state.root.className);
  return state;
};
