import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DialogSurfaceState } from './DialogSurface.types';

import styles from './DialogSurface.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dialogSurfaceClassNames: { root: string } = {
  root: componentMarkers('dialog-surface'),
};

type DialogSurfaceRootDataAttributes = {
  'data-nested'?: true;
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open and
 * data-modal-type; only the nesting flag is missing, and the one rule that reads it is the nested
 * backdrop's transparency — two stacked backdrops would otherwise double-darken the page.
 */
export const useDialogSurfaceStyles = (state: DialogSurfaceState): DialogSurfaceState => {
  const root: DialogSurfaceState['root'] & DialogSurfaceRootDataAttributes = {
    ...state.root,
    'data-nested': state.nested || undefined,
    className: clsx(dialogSurfaceClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
