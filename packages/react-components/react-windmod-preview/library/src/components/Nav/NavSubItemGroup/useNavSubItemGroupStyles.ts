import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { NavSubItemGroupState } from './NavSubItemGroup.types';

import styles from './NavSubItemGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navSubItemGroupClassNames: { root: string } = {
  root: componentMarkers('nav-sub-item-group'),
};

/** Applies the visual contract, returning new state. */
export const useNavSubItemGroupStyles = (state: NavSubItemGroupState): NavSubItemGroupState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(navSubItemGroupClassNames.root, styles.root, state.root.className),
  },
});
