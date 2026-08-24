import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import { navRowClasses } from '../NavItem/useNavItemStyles';
import type { NavSubItemState } from './NavSubItem.types';

import styles from './NavSubItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navSubItemClassNames: { root: string } = {
  root: componentMarkers('nav-sub-item'),
};

/**
 * Applies the visual contract on top of the shared nav row's, returning new state. The root
 * carries NavItem's marker pair as well as its own: the row look is reached through it.
 */
export const useNavSubItemStyles = (state: NavSubItemState): NavSubItemState => {
  const { root } = navRowClasses(state);

  return {
    ...state,
    root: { ...root, className: clsx(navSubItemClassNames.root, styles.root, root.className) },
  };
};
