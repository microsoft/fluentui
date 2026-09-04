import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DrawerHeaderState } from './DrawerHeader.types';

import styles from './DrawerHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const drawerHeaderClassNames: { root: string } = {
  root: componentMarkers('drawer-header'),
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-scroll-state, which the separator rule selects on.
 */
export const useDrawerHeaderStyles = (state: DrawerHeaderState): DrawerHeaderState => {
  const root: DrawerHeaderState['root'] = {
    ...state.root,
    className: clsx(drawerHeaderClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
