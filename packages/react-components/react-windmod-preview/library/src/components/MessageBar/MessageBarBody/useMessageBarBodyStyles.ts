import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { MessageBarBodyState } from './MessageBarBody.types';

import styles from './MessageBarBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const messageBarBodyClassNames: { root: string } = {
  root: componentMarkers('message-bar-body'),
};

/** Applies the visual contract, returning new state. */
export const useMessageBarBodyStyles = (state: MessageBarBodyState): MessageBarBodyState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(messageBarBodyClassNames.root, styles.root, state.root.className),
  },
});
