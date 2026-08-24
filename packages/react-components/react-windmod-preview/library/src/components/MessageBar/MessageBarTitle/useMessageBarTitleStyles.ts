import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { MessageBarTitleState } from './MessageBarTitle.types';

import styles from './MessageBarTitle.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const messageBarTitleClassNames: { root: string } = {
  root: componentMarkers('message-bar-title'),
};

/** Applies the visual contract, returning new state. */
export const useMessageBarTitleStyles = (state: MessageBarTitleState): MessageBarTitleState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(messageBarTitleClassNames.root, styles.root, state.root.className),
  },
});
