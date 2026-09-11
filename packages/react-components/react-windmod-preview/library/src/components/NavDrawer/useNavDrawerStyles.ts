import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { NavDrawerState } from './NavDrawer.types';

import styles from './NavDrawer.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navDrawerClassNames: { root: string } = {
  root: componentMarkers('nav-drawer'),
};

/**
 * Applies the visual contract, returning new state. The width class rides on `size` being absent,
 * which the drawer beneath has already resolved away by render time.
 */
export const useNavDrawerStyles = (state: NavDrawerState): NavDrawerState => {
  const root: NavDrawerState['root'] = {
    ...state.root,
    className: clsx(
      navDrawerClassNames.root,
      styles.root,
      state.size === undefined && styles.defaultWidth,
      state.root.className,
    ),
  };

  return { ...state, root };
};
