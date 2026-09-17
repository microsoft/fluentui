import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ToastState } from './Toast.types';

import styles from './Toast.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toastClassNames: { root: string } = {
  root: componentMarkers('toast'),
};

type ToastRootDataAttributes = {
  'data-appearance'?: ToastState['appearance'];
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-intent;
 * data-appearance is style-only, and both are the stamps ToastTitle's and ToastBody's group
 * variants select on.
 */
export const useToastStyles = (state: ToastState): ToastState => {
  const root: ToastState['root'] & ToastRootDataAttributes = {
    ...state.root,
    'data-appearance': state.appearance,
    className: clsx(
      toastClassNames.root,
      styles.root,
      state.appearance === 'inverted' && styles.inverted,
      state.root.className,
    ),
  };

  return { ...state, root };
};
