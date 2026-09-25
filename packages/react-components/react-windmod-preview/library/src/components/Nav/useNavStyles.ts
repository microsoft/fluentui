import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { NavState } from './Nav.types';

import styles from './Nav.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navClassNames: { root: string } = {
  root: componentMarkers('nav'),
};

/**
 * Applies the visual contract, returning new state. `density` is not stamped here: nothing in
 * this family selects it on the Nav, and every row carries its own resolved value.
 */
export const useNavStyles = (state: NavState): NavState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(navClassNames.root, styles.root, state.root.className),
  },
});
