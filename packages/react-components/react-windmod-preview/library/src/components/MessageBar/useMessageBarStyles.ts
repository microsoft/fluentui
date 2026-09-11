import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { MessageBarState } from './MessageBar.types';

import styles from './MessageBar.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const messageBarClassNames: { root: string } = {
  root: componentMarkers('message-bar'),
};

type MessageBarRootDataAttributes = {
  'data-shape'?: MessageBarState['shape'];
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps
 * data-layout and data-intent; data-shape is style-only.
 *
 * The icon slot arrives with its glyph already restored — see MessageBar.tsx.
 */
export const useMessageBarStyles = (state: MessageBarState): MessageBarState => {
  const root: MessageBarState['root'] & MessageBarRootDataAttributes = {
    ...state.root,
    'data-shape': state.shape,
    className: clsx(messageBarClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    icon: slotClasses(state.icon, styles.icon),
    bottomReflowSpacer: slotClasses(state.bottomReflowSpacer, styles.bottomReflowSpacer),
  };
};
