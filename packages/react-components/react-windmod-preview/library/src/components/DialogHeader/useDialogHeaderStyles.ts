import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DialogHeaderState } from './DialogHeader.types';

import styles from './DialogHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dialogHeaderClassNames: { root: string } = {
  root: componentMarkers('dialog-header'),
};

/** Applies the visual contract, returning new state. */
export const useDialogHeaderStyles = (state: DialogHeaderState): DialogHeaderState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(dialogHeaderClassNames.root, styles.root, state.root.className),
  },
});
