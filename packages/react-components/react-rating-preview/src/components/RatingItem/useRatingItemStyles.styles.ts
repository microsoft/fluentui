import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';
import { tokens } from '@fluentui/react-theme';
//import { tokens } from '@fluentui/react-theme';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  unfilledIcon: 'fui-RatingItem__unfilledIcon',
  filledIcon: 'fui-RatingItem__filledIcon',
  outlineIcon: 'fui-RatingItem__outlineIcon',
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
    marginLeft: '-50%',
  },
  filledUnselected: {
    color: tokens.colorNeutralBackground6,
    '@media (forced-colors: active)': {
      // In high contrast, the 'outline' icon is always visible,
      // so we need to hide the 'filled' icon.
      display: 'none',
    },
  },
  outlineUnselected: {
    color: tokens.colorNeutralForeground3,
  },
  outlineHighContrastOnly: {
    // When the style is 'filled' for unselected icons, we still
    // need to show the outline version for high contrast.
    color: tokens.colorTransparentStroke,
  },
});

/**
 * Apply styling to the RatingItem slots based on the state
 */
export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  const { size, iconFillWidth } = state;
  const styles = useStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();

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
      indicatorStyles.filledUnselected,
      iconFillWidth === 0.5 && indicatorStyles.upperHalf,
      state.unfilledIcon.className,
    );
  }
  if (state.outlineIcon) {
    state.outlineIcon.className = mergeClasses(
      ratingItemClassNames.outlineIcon,
      indicatorBaseClassName,
      indicatorStyles.outlineUnselected,
      state.unfilledIcon ? indicatorStyles.outlineHighContrastOnly : indicatorStyles.outlineUnselected,
      iconFillWidth === 0.5 && indicatorStyles.upperHalf,
      state.outlineIcon.className,
    );
  }
  if (state.filledIcon) {
    state.filledIcon.className = mergeClasses(
      ratingItemClassNames.filledIcon,
      indicatorBaseClassName,
      iconFillWidth === 0.5 && indicatorStyles.lowerHalf,
      state.filledIcon.className,
    );
  }

  return state;
};
