import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

import styles from './TeachingPopoverHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverHeaderClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-header'),
};

/**
 * Applies the visual contract, returning new state. Brand is the only appearance the header
 * repaints; the unset and inverted surfaces leave it on its neutral colours.
 */
export const useTeachingPopoverHeaderStyles = (state: TeachingPopoverHeaderState): TeachingPopoverHeaderState => {
  const isBrand = state.appearance === 'brand';

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(teachingPopoverHeaderClassNames.root, styles.root, isBrand && styles.brand, state.root.className),
    },
    icon: state.icon && {
      ...state.icon,
      className: clsx(styles.icon, isBrand && styles.iconBrand, state.icon.className),
    },
    dismissButton: state.dismissButton && {
      ...state.dismissButton,
      className: clsx(styles.dismissButton, isBrand && styles.dismissBrand, state.dismissButton.className),
    },
  };
};
