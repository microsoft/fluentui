import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { RatingState } from './Rating.types';

import styles from './Rating.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const ratingClassNames: { root: string } = {
  root: componentMarkers('rating'),
};

/**
 * Applies the visual contract, returning new state. The whole stylesheet is the root's flex row —
 * colour and size have no axis here, they reach the items through the rating item context.
 */
export const useRatingStyles = (state: RatingState): RatingState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(ratingClassNames.root, styles.root, state.root.className),
  },
});
