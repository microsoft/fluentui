import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  selectedIcon: 'fui-RatingItem__selectedIcon',
  unselectedIcon: 'fui-RatingItem__unselectedIcon',
  halfValueInput: 'fui-RatingItem__halfValueInput',
  fullValueInput: 'fui-RatingItem__fullValueInput',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
    ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
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
  height: '100%',
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
  display: 'flex',
  overflow: 'hidden',
  color: tokens.colorNeutralForeground1,
  fill: 'currentColor',
  pointerEvents: 'none',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
});

const useIndicatorStyles = makeStyles({
  lowerHalf: {
    right: '50%',
    '& > svg': {
      flex: '0 0 auto',
    },
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
  filled: {
    color: tokens.colorNeutralBackground6,
    stroke: tokens.colorTransparentStroke,
    '@media (forced-colors: active)': {
      color: 'Canvas',
      stroke: 'CanvasText',
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
  'use no memo';

  const { color, size, iconFillWidth, appearance } = state;
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

  if (state.unselectedIcon) {
    state.unselectedIcon.className = mergeClasses(
      ratingItemClassNames.unselectedIcon,
      indicatorBaseClassName,
      appearance === 'filled' && indicatorStyles.filled,
      color === 'brand' && (appearance === 'filled' ? indicatorStyles.brandFilled : indicatorStyles.brand),
      color === 'marigold' && (appearance === 'filled' ? indicatorStyles.marigoldFilled : indicatorStyles.marigold),
      iconFillWidth === 0.5 && indicatorStyles.upperHalf,
      state.unselectedIcon.className,
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
