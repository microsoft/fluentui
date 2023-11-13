import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';
import { tokens } from '@fluentui/react-theme';
//import { tokens } from '@fluentui/react-theme';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  indicator: 'fui-RatingItem__indicator',
  halfValueInput: 'fui-RatingItem__halfValueInput',
  fullValueInput: 'fui-RatingItem__fullValueInput',
};

const indicatorSizes = {
  small: '12px',
  medium: '16px',
  large: '20px',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
});

const useInputBaseClassName = makeResetStyles({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  boxSizing: 'border-box',
  margin: 0,
  opacity: 0,
  cursor: 'pointer',
});

const useInputStyles = makeStyles({
  lowerHalf: {
    right: '50%',
  },
  upperHalf: {
    left: '50%',
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  display: 'inline-block',
  color: tokens.colorNeutralForeground1,
  overflow: 'hidden',
  fill: 'currentColor',
  pointerEvents: 'none',
});

const useIndicatorStyles = makeStyles({
  small: {
    fontSize: indicatorSizes.small,
  },

  medium: {
    fontSize: indicatorSizes.medium,
  },

  large: {
    fontSize: indicatorSizes.large,
  },
});

/**
 * Apply styling to the RatingItem slots based on the state
 */
export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  const { size } = state;
  const styles = useStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();

  state.root.className = mergeClasses(ratingItemClassNames.root, styles.root, state.root.className);

  if (state.halfValueInput) {
    state.halfValueInput.className = mergeClasses(
      ratingItemClassNames.halfValueInput,
      inputBaseClassName,
      inputStyles.lowerHalf,
      state.halfValueInput.className,
    );
  }

  if (state.fullValueInput) {
    state.fullValueInput.className = mergeClasses(
      ratingItemClassNames.fullValueInput,
      inputBaseClassName,
      state.halfValueInput && inputStyles.upperHalf,
      state.fullValueInput.className,
    );
  }

  if (state.indicator) {
    state.indicator.className = mergeClasses(
      ratingItemClassNames.indicator,
      indicatorBaseClassName,
      indicatorStyles[size],
      state.indicator.className,
    );
  }

  return state;
};
