import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MessageBarActionsState } from './MessageBarActions.types';

import styles from './MessageBarActions.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const messageBarActionsClassNames: { root: string } = {
  root: componentMarkers('message-bar-actions'),
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps
 * data-layout and data-has-actions, which is everything the CSS selects on.
 */
export const useMessageBarActionsStyles = (state: MessageBarActionsState): MessageBarActionsState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(messageBarActionsClassNames.root, styles.root, state.root.className),
  },
  containerAction: state.containerAction && {
    ...state.containerAction,
    className: clsx(styles.containerAction, state.containerAction.className),
  },
});
