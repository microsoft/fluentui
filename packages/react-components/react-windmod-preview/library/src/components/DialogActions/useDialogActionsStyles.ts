import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DialogActionsState } from './DialogActions.types';

import styles from './DialogActions.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dialogActionsClassNames: { root: string } = {
  root: componentMarkers('dialog-actions'),
};

type DialogActionsRootDataAttributes = {
  'data-position'?: DialogActionsState['position'];
  'data-fluid'?: true;
};

/**
 * Applies the visual contract, returning new state. `data-position` is a value attribute, not a
 * presence stamp: the fluid rules select on which of the two columns the actions occupy.
 */
export const useDialogActionsStyles = (state: DialogActionsState): DialogActionsState => {
  const root: DialogActionsState['root'] & DialogActionsRootDataAttributes = {
    ...state.root,
    'data-position': state.position,
    'data-fluid': state.fluid || undefined,
    className: clsx(
      dialogActionsClassNames.root,
      styles.root,
      state.position === 'start' ? styles.positionStart : styles.positionEnd,
      state.fluid && styles.fluid,
      state.root.className,
    ),
  };

  return { ...state, root };
};
