import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DrawerState } from './Drawer.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const drawerClassNames: { root: string } = {
  root: componentMarkers('drawer'),
};

/**
 * Adds the identity marker pair and nothing else — Drawer renders no element of its own, and the
 * child drawer it selects merges this className onto the element it does render. There is no
 * module.css because Griffel's useDrawerStyles authors no declarations either.
 */
export const useDrawerStyles = (state: DrawerState): DrawerState => {
  const root: DrawerState['root'] = {
    ...state.root,
    className: clsx(drawerClassNames.root, state.root.className),
  };

  return { ...state, root };
};
