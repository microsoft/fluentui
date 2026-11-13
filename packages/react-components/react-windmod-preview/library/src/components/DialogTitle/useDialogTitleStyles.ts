import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DialogTitleState } from './DialogTitle.types';

import styles from './DialogTitle.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dialogTitleClassNames: { root: string } = {
  root: componentMarkers('dialog-title'),
};

/** Applies the visual contract, returning new state. */
export const useDialogTitleStyles = (state: DialogTitleState): DialogTitleState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(dialogTitleClassNames.root, styles.root, state.root.className),
  },
});
