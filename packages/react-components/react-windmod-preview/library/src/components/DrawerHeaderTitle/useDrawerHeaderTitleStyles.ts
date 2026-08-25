import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

import styles from './DrawerHeaderTitle.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const drawerHeaderTitleClassNames: { root: string } = {
  root: componentMarkers('drawer-header-title'),
};

/**
 * Applies the visual contract, returning new state. Griffel reaches the heading and action slots
 * by delegating to react-dialog's DialogTitle styles hook; this layer replicates those
 * declarations locally instead, which is what keeps it independent of a windmod Dialog.
 */
export const useDrawerHeaderTitleStyles = (state: DrawerHeaderTitleState): DrawerHeaderTitleState => {
  const root: DrawerHeaderTitleState['root'] = {
    ...state.root,
    className: clsx(drawerHeaderTitleClassNames.root, styles.root, state.root.className),
  };

  const heading = state.heading && {
    ...state.heading,
    className: clsx(styles.heading, !state.action && styles.headingWithoutAction, state.heading.className),
  };

  const action = state.action && {
    ...state.action,
    className: clsx(styles.action, state.action.className),
  };

  return { ...state, root, heading, action };
};
