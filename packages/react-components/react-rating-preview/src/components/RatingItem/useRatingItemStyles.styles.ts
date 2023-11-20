import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';
import { tokens } from '@fluentui/react-theme';
//import { tokens } from '@fluentui/react-theme';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  unfilledIcon: 'fui-RatingItem__unfilledIcon',
  filledIcon: 'fui-RatingItem__filledIcon',
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
  small: {
    fontSize: indicatorSizes.small,
    width: indicatorSizes.small,
    height: indicatorSizes.small,
  },

  medium: {
    fontSize: indicatorSizes.medium,
    width: indicatorSizes.medium,
    height: indicatorSizes.medium,
  },

  large: {
    fontSize: indicatorSizes.large,
    width: indicatorSizes.large,
    height: indicatorSizes.large,
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
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
});

const useIndicatorStyles = makeStyles({
  lowerHalf: {
    right: '50%',
  },
  upperHalf: {
    left: '50%',
  },
  hidden: {
    display: 'none',
  },
});

/**
 * Apply styling to the RatingItem slots based on the state
 */
export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  const { size, displayedRatingValue, value, compact } = state;
  const styles = useStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();

  let iconWidth;
  //to-do : 5 should be max
  if (compact) {
    iconWidth = value / 5.0;
  } else if (displayedRatingValue >= value) {
    iconWidth = 1;
  } else if (displayedRatingValue >= value - 0.5) {
    iconWidth = 0.5;
  } else {
    iconWidth = 0;
  }

  state.root.className = mergeClasses(ratingItemClassNames.root, styles.root, styles[size], state.root.className);

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

  if (state.unfilledIcon) {
    state.unfilledIcon.className = mergeClasses(
      ratingItemClassNames.unfilledIcon,
      indicatorBaseClassName,
      iconWidth === 1 && indicatorStyles.hidden,
      state.unfilledIcon.className,
    );
    if (iconWidth > 0) {
      state.unfilledIcon.style = {
        left: -(1 - iconWidth) * 100 + '%',
        marginLeft: (1 - iconWidth) * 100 + '%',
      };
    }
  }
  if (state.filledIcon) {
    state.filledIcon.className = mergeClasses(
      ratingItemClassNames.filledIcon,
      indicatorBaseClassName,
      iconWidth === 0 && indicatorStyles.hidden,
      state.filledIcon.className,
    );
    if (iconWidth < 1) {
      state.filledIcon.style = {
        right: iconWidth * 100 + '%',
      };
    }
  }

  return state;
};
