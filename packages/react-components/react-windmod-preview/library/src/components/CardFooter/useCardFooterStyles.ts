import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { CardFooterState } from './CardFooter.types';

import styles from './CardFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const cardFooterClassNames: { root: string } = {
  root: componentMarkers('card-footer'),
};

/** Applies the visual contract, returning new state. */
export const useCardFooterStyles = (state: CardFooterState): CardFooterState => ({
  ...state,
  root: { ...state.root, className: clsx(cardFooterClassNames.root, styles.root, state.root.className) },
  action: state.action && { ...state.action, className: clsx(styles.action, state.action.className) },
});
