import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

import styles from './DrawerHeaderNavigation.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const drawerHeaderNavigationClassNames: { root: string } = {
  root: componentMarkers('drawer-header-navigation'),
};

/**
 * Applies the visual contract, returning new state.
 */
export const useDrawerHeaderNavigationStyles = (state: DrawerHeaderNavigationState): DrawerHeaderNavigationState => {
  const root: DrawerHeaderNavigationState['root'] = {
    ...state.root,
    className: clsx(drawerHeaderNavigationClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
