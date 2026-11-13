import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { OverlayDrawerState } from './OverlayDrawer.types';

import styles from './OverlayDrawer.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const overlayDrawerClassNames: { root: string } = {
  root: componentMarkers('overlay-drawer'),
};

type OverlayDrawerRootDataAttributes = {
  'data-size'?: OverlayDrawerState['size'];
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open and
 * data-position, and the headless DialogSurface stamps data-modal-type; data-size is the one
 * channel this layer adds, and the size and position blocks both select on it.
 */
export const useOverlayDrawerStyles = (state: OverlayDrawerState): OverlayDrawerState => {
  const root: OverlayDrawerState['root'] & OverlayDrawerRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(overlayDrawerClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
