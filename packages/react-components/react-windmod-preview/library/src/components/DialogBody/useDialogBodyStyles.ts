import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DialogBodyState } from './DialogBody.types';

import styles from './DialogBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dialogBodyClassNames: { root: string } = {
  root: componentMarkers('dialog-body'),
};

/** Applies the visual contract, returning new state. */
export const useDialogBodyStyles = (state: DialogBodyState): DialogBodyState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(dialogBodyClassNames.root, styles.root, state.root.className),
  },
});
