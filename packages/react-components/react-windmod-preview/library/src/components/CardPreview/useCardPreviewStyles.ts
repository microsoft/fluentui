import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { CardPreviewState } from './CardPreview.types';

import styles from './CardPreview.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const cardPreviewClassNames: { root: string } = {
  root: componentMarkers('card-preview'),
};

/** Applies the visual contract, returning new state. */
export const useCardPreviewStyles = (state: CardPreviewState): CardPreviewState => ({
  ...state,
  root: { ...state.root, className: clsx(cardPreviewClassNames.root, styles.root, state.root.className) },
  logo: state.logo && { ...state.logo, className: clsx(styles.logo, state.logo.className) },
});
