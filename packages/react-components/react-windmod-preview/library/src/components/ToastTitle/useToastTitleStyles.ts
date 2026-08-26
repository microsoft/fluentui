import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ToastTitleState } from './ToastTitle.types';

import styles from './ToastTitle.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toastTitleClassNames: { root: string } = {
  root: componentMarkers('toast-title'),
};

/**
 * Applies the visual contract, returning new state. The intent and appearance the media colour
 * depends on are stamped on the Toast root, so the rules reach it as group variants.
 *
 * The media slot arrives with its glyph already restored — see ToastTitle.tsx.
 */
export const useToastTitleStyles = (state: ToastTitleState): ToastTitleState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(toastTitleClassNames.root, styles.root, state.root.className),
  },
  media: state.media && { ...state.media, className: clsx(styles.media, state.media.className) },
  action: state.action && { ...state.action, className: clsx(styles.action, state.action.className) },
});
