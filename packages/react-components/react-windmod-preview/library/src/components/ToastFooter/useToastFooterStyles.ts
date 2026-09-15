import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ToastFooterState } from './ToastFooter.types';

import styles from './ToastFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toastFooterClassNames: { root: string } = {
  root: componentMarkers('toast-footer'),
};

/** Applies the visual contract, returning new state. */
export const useToastFooterStyles = (state: ToastFooterState): ToastFooterState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(toastFooterClassNames.root, styles.root, state.root.className),
  },
});
