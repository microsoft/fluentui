import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
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

  return {
    ...state,
    root,
    heading: slotClasses(state.heading, styles.heading, !state.action && styles.headingWithoutAction),
    action: slotClasses(state.action, styles.action),
  };
};
