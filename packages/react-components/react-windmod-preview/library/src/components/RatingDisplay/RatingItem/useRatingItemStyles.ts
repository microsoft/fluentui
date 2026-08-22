import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { RatingItemState } from './RatingItem.types';

import styles from './RatingItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const ratingItemClassNames: { root: string } = {
  root: componentMarkers('rating-item'),
};

/**
 * Applies the visual contract, returning new state. A half fill renders both indicators: the
 * unselected glyph at full width underneath, the selected one clipped to the inline-start half
 * on top. `neutral` is the selected indicator's base look and carries no colour class.
 */
export const useRatingItemStyles = (state: RatingItemState): RatingItemState => {
  const { color, iconFillWidth, size } = state;
  const isHalf = iconFillWidth === 0.5;

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(ratingItemClassNames.root, styles.root, styles[size], state.root.className),
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
        styles[`unselected-${color}`],
        styles.unselected,
        isHalf && styles['upper-half'],
        state.unselectedIcon.className,
      ),
    },
  };
};
