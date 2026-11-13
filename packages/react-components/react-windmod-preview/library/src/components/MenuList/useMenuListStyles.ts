import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuListState } from './MenuList.types';

import styles from './MenuList.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuListClassNames: { root: string } = {
  root: componentMarkers('menu-list'),
};

/**
 * Applies the visual contract, returning new state. hasMenuContext is the headless flag for a
 * list rendered inside a Menu rather than standalone; the focusgroup attribute the hook stamps
 * passes through untouched.
 */
export const useMenuListStyles = (state: MenuListState): MenuListState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(menuListClassNames.root, styles.root, state.hasMenuContext && styles.inMenu, state.root.className),
  },
});
