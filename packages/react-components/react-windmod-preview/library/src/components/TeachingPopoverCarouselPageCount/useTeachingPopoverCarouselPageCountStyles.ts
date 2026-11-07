import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverCarouselPageCountState } from './TeachingPopoverCarouselPageCount.types';

import styles from './TeachingPopoverCarouselPageCount.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselPageCountClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-page-count'),
};

/**
 * Applies the visual contract, returning new state. The headless hook has already invoked the
 * consumer's render function into `root.children`, so nothing here may invoke it again.
 */
export const useTeachingPopoverCarouselPageCountStyles = (
  state: TeachingPopoverCarouselPageCountState,
): TeachingPopoverCarouselPageCountState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(teachingPopoverCarouselPageCountClassNames.root, styles.root, state.root.className),
  },
});
