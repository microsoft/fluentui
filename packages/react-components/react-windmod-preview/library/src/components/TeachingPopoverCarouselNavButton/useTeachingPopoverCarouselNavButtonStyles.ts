import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverCarouselNavButtonState } from './TeachingPopoverCarouselNavButton.types';

import styles from './TeachingPopoverCarouselNavButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselNavButtonClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-nav-button'),
};

/**
 * Applies the visual contract, returning new state. Brand is the only appearance the dot inverts;
 * selection is already published by the headless hook, in both of its spellings.
 */
export const useTeachingPopoverCarouselNavButtonStyles = (
  state: TeachingPopoverCarouselNavButtonState,
): TeachingPopoverCarouselNavButtonState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(
      teachingPopoverCarouselNavButtonClassNames.root,
      styles.root,
      state.appearance === 'brand' && styles.brand,
      state.root.className,
    ),
  },
});
