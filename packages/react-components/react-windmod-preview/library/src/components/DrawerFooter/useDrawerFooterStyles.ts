import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DrawerFooterState } from './DrawerFooter.types';

import styles from './DrawerFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const drawerFooterClassNames: { root: string } = {
  root: componentMarkers('drawer-footer'),
};

/**
 * Applies the visual contract, returning new state. See useDrawerHeaderStyles for the stamp the
 * separator rule selects on.
 */
export const useDrawerFooterStyles = (state: DrawerFooterState): DrawerFooterState => {
  const root: DrawerFooterState['root'] = {
    ...state.root,
    className: clsx(drawerFooterClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
