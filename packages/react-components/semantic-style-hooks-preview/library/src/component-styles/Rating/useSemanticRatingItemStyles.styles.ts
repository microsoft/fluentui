import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { ratingItemClassNames, type RatingItemState } from '@fluentui/react-rating';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
  color: semanticTokens.ctrlRatingIconForegroundFilled,
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
    color: semanticTokens.ctrlRatingIconForegroundEmpty,
    stroke: semanticTokens.strokeLayer,
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
export const useSemanticRatingItemStyles = (_state: unknown): RatingItemState => {
  'use no memo';

  const state = _state as RatingItemState;

  const { color, size, iconFillWidth, appearance } = state;
  const styles = useStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();

  state.root.className = mergeClasses(
    state.root.className,
    ratingItemClassNames.root,
    styles.root,
    styles[size],
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.halfValueInput) {
    state.halfValueInput.className = mergeClasses(
      state.halfValueInput.className,
      ratingItemClassNames.halfValueInput,
      inputBaseClassName,
      inputStyles.lowerHalf,
      getSlotClassNameProp_unstable(state.halfValueInput),
    );
  }

  if (state.fullValueInput) {
    state.fullValueInput.className = mergeClasses(
      state.fullValueInput.className,
      ratingItemClassNames.fullValueInput,
      inputBaseClassName,
      state.halfValueInput && inputStyles.upperHalf,
      getSlotClassNameProp_unstable(state.fullValueInput),
    );
  }

  if (state.unselectedIcon) {
    state.unselectedIcon.className = mergeClasses(
      state.unselectedIcon.className,
      ratingItemClassNames.unselectedIcon,
      indicatorBaseClassName,
      appearance === 'filled' && indicatorStyles.filled,
      color === 'brand' && (appearance === 'filled' ? indicatorStyles.brandFilled : indicatorStyles.brand),
      color === 'marigold' && (appearance === 'filled' ? indicatorStyles.marigoldFilled : indicatorStyles.marigold),
      iconFillWidth === 0.5 && indicatorStyles.upperHalf,
      getSlotClassNameProp_unstable(state.unselectedIcon),
    );
  }

  if (state.selectedIcon) {
    state.selectedIcon.className = mergeClasses(
      state.selectedIcon.className,
      ratingItemClassNames.selectedIcon,
      indicatorBaseClassName,
      color === 'brand' && indicatorStyles.brand,
      color === 'marigold' && indicatorStyles.marigold,
      iconFillWidth === 0.5 && indicatorStyles.lowerHalf,
      getSlotClassNameProp_unstable(state.selectedIcon),
    );
  }

  return state;
};
