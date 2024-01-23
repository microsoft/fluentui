import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';
import { tokens } from '@fluentui/react-theme';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  selectedIcon: 'fui-RatingItem__selectedIcon',
  unselectedFilledIcon: 'fui-RatingItem__unselectedFilledIcon',
  unselectedOutlineIcon: 'fui-RatingItem__unselectedOutlineIcon',
  halfValueInput: 'fui-RatingItem__halfValueInput',
  fullValueInput: 'fui-RatingItem__fullValueInput',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  small: {
    fontSize: '12px',
    width: '12px',
    height: '12px',
  },

  medium: {
    fontSize: '16px',
    width: '16px',
    height: '16px',
  },

  large: {
    fontSize: '20px',
    width: '20px',
    height: '20px',
  },

  'extra-large': {
    fontSize: '28px',
    width: '28px',
    height: '28px',
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
  color: tokens.colorNeutralForeground1,
  fill: 'currentColor',
  pointerEvents: 'none',
  position: 'absolute',
  left: 0,
  right: 0,
});

const useIndicatorStyles = makeStyles({
  lowerHalf: {
    right: '50%',
  },
  upperHalf: {
    left: '50%',
    marginLeft: '-50%',
  },
  brand: {
    color: tokens.colorBrandForeground1,
  },
  marigold: {
    color: tokens.colorPaletteMarigoldBorderActive,
  },
  highContrastOnly: {
    color: tokens.colorTransparentStroke,
  },
  filled: {
    color: tokens.colorNeutralBackground2,
    '@media (forced-colors: active)': {
      // In high contrast the 'outline' icon is always visible, so we need to hide the 'filled' icon.
      display: 'none',
    },
  },
  brandFilled: {
    color: tokens.colorBrandBackground2,
  },
  marigoldFilled: {
    color: tokens.colorPaletteMarigoldBackground2,
  },
});

/**
 * Apply styling to the RatingItem slots based on the state
 */
export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  const { color, size, iconFillWidth } = state;
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

  if (state.unselectedOutlineIcon) {
    state.unselectedOutlineIcon.className = mergeClasses(
      ratingItemClassNames.unselectedOutlineIcon,
      indicatorBaseClassName,
      color === 'brand' && indicatorStyles.brand,
      color === 'marigold' && indicatorStyles.marigold,
      // If there is also a filled icon, the outline icon is only visible in high contrast
      state.unselectedFilledIcon && indicatorStyles.highContrastOnly,
      iconFillWidth === 0.5 && indicatorStyles.upperHalf,
      state.unselectedOutlineIcon.className,
    );
  }
  if (state.unselectedFilledIcon) {
    state.unselectedFilledIcon.className = mergeClasses(
      ratingItemClassNames.unselectedFilledIcon,
      indicatorBaseClassName,
      indicatorStyles.filled,
      color === 'brand' && indicatorStyles.brandFilled,
      color === 'marigold' && indicatorStyles.marigoldFilled,
      iconFillWidth === 0.5 && indicatorStyles.upperHalf,
      state.unselectedFilledIcon.className,
    );
  }
  if (state.selectedIcon) {
    state.selectedIcon.className = mergeClasses(
      ratingItemClassNames.selectedIcon,
      indicatorBaseClassName,
      color === 'brand' && indicatorStyles.brand,
      color === 'marigold' && indicatorStyles.marigold,
      iconFillWidth === 0.5 && indicatorStyles.lowerHalf,
      state.selectedIcon.className,
    );
  }

  return state;
};
