import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DrawerBodyState } from './DrawerBody.types';

import styles from './DrawerBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const drawerBodyClassNames: { root: string } = {
  root: componentMarkers('drawer-body'),
};

/**
 * Applies the visual contract, returning new state. The headless hook stamps nothing this layer needs to add; the scrolling geometry it publishes reaches the header and footer as data-scroll-state.
 */
export const useDrawerBodyStyles = (state: DrawerBodyState): DrawerBodyState => {
  const root: DrawerBodyState['root'] = {
    ...state.root,
    className: clsx(drawerBodyClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
