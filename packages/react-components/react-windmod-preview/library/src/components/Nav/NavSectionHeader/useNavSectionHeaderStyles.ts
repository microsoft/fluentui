import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { NavSectionHeaderState } from './NavSectionHeader.types';

import styles from './NavSectionHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navSectionHeaderClassNames: { root: string } = {
  root: componentMarkers('nav-section-header'),
};

/**
 * Applies the visual contract, returning new state. No colour is authored: Griffel's section
 * header sets none either, inheriting the provider's neutral foreground.
 */
export const useNavSectionHeaderStyles = (state: NavSectionHeaderState): NavSectionHeaderState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(navSectionHeaderClassNames.root, styles.root, state.root.className),
  },
});
