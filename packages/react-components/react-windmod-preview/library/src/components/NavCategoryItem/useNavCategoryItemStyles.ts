import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { navRowClasses } from '../NavItem/useNavItemStyles';
import type { NavCategoryItemState } from './NavCategoryItem.types';

import styles from './NavCategoryItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navCategoryItemClassNames: { root: string } = {
  root: componentMarkers('nav-category-item'),
};

/**
 * Applies the visual contract on top of the shared nav row's, returning new state. The root
 * carries NavItem's marker pair as well as its own: the row look and the icon's selected block
 * are reached through it.
 */
export const useNavCategoryItemStyles = (state: NavCategoryItemState): NavCategoryItemState => {
  const { icon, root } = navRowClasses(state);

  return {
    ...state,
    icon,
    root: { ...root, className: clsx(navCategoryItemClassNames.root, root.className) },
    expandIcon: state.expandIcon && {
      ...state.expandIcon,
      className: clsx(styles.expandIcon, state.expandIcon.className),
    },
  };
};
