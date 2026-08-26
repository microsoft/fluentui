import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

import styles from './TeachingPopoverTitle.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverTitleClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-title'),
};

/**
 * Applies the visual contract, returning new state. Brand is the only appearance the title
 * repaints; the unset and inverted surfaces leave it on its neutral colours.
 */
export const useTeachingPopoverTitleStyles = (state: TeachingPopoverTitleState): TeachingPopoverTitleState => {
  const isBrand = state.appearance === 'brand';

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(teachingPopoverTitleClassNames.root, styles.root, isBrand && styles.brand, state.root.className),
    },
    dismissButton: state.dismissButton && {
      ...state.dismissButton,
      className: clsx(styles.dismissButton, isBrand && styles.dismissBrand, state.dismissButton.className),
    },
  };
};
