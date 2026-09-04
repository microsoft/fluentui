import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { ToastBodyState } from './ToastBody.types';

import styles from './ToastBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toastBodyClassNames: { root: string } = {
  root: componentMarkers('toast-body'),
};

/**
 * Applies the visual contract, returning new state. The appearance the inverted colours depend on
 * is stamped on the Toast root, so the rules reach both slots as group variants.
 */
export const useToastBodyStyles = (state: ToastBodyState): ToastBodyState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(toastBodyClassNames.root, styles.root, state.root.className),
  },
  subtitle: slotClasses(state.subtitle, styles.subtitle),
});
