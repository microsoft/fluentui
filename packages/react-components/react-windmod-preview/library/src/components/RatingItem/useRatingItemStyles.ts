import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { RatingItemState } from './RatingItem.types';

import styles from './RatingItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const ratingItemClassNames: { root: string } = {
  root: componentMarkers('rating-item'),
};

/**
 * Applies the visual contract, returning new state. A half fill renders both indicators: the
 * unselected glyph at full width underneath, the selected one clipped to the inline-start half
 * on top. `neutral` is the selected indicator's base look and carries no colour class. An
 * interactive rating stamps `appearance: 'outline'`, which draws the unselected glyph in the
 * selected colour family instead of the muted filled one; a display always stamps `'filled'`. The
 * input slots exist only under an interactive rating, and only a half-step one has both.
 */
export const useRatingItemStyles = (state: RatingItemState): RatingItemState => {
  const { appearance, color, iconFillWidth, size } = state;
  const isFilled = appearance === 'filled';
  const isHalf = iconFillWidth === 0.5;

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(ratingItemClassNames.root, styles.root, styles[size], state.root.className),
    },
    halfValueInput: state.halfValueInput && {
      ...state.halfValueInput,
      className: clsx(styles.input, styles['input-lower-half'], state.halfValueInput.className),
    },
    fullValueInput: state.fullValueInput && {
      ...state.fullValueInput,
      className: clsx(styles.input, state.halfValueInput && styles['input-upper-half'], state.fullValueInput.className),
    },
    selectedIcon: state.selectedIcon && {
      ...state.selectedIcon,
      className: clsx(
        styles.indicator,
        color !== 'neutral' && styles[`selected-${color}`],
        isHalf && styles['lower-half'],
        state.selectedIcon.className,
      ),
    },
    unselectedIcon: state.unselectedIcon && {
      ...state.unselectedIcon,
      className: clsx(
        styles.indicator,
        isFilled
          ? [styles[`unselected-${color}`], styles.unselected]
          : color !== 'neutral' && styles[`selected-${color}`],
        isHalf && styles['upper-half'],
        state.unselectedIcon.className,
      ),
    },
  };
};
