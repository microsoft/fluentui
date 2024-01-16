import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';
import { tokens } from '@fluentui/react-theme';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
};

/**
 * Styles for the root slot
 */

const useRootClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: tokens.colorNeutralForeground1,
  ...createFocusOutlineStyle({ style: {}, selector: 'focus' }),
});

/**
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  const styles = useRootClassName();
  state.root.className = mergeClasses(ratingClassNames.root, styles, state.root.className);
  return state;
};
