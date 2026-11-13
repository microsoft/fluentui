import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { RatingDisplayState } from './RatingDisplay.types';

import styles from './RatingDisplay.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const ratingDisplayClassNames: { root: string } = {
  root: componentMarkers('rating-display'),
};

/**
 * Applies the visual contract, returning new state. `small` and `medium` share the caption1 base
 * and carry no size class. The count text's leading separator exists only next to a value text.
 */
export const useRatingDisplayStyles = (state: RatingDisplayState): RatingDisplayState => {
  const { size } = state;
  const sizeClass = (size === 'large' || size === 'extra-large') && styles[size];

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(ratingDisplayClassNames.root, styles.root, state.root.className),
    },
    valueText: slotClasses(state.valueText, styles.label, styles.strong, sizeClass),
    countText: slotClasses(state.countText, styles.label, sizeClass, state.valueText && styles.divider),
  };
};
