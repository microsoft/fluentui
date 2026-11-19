import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverCarouselNavState } from './TeachingPopoverCarouselNav.types';

import styles from './TeachingPopoverCarouselNav.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselNavClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-nav'),
};

/**
 * Applies the visual contract, returning new state. `children` is a render function the headless
 * renderer maps over the carousel's values, so nothing here may touch it.
 */
export const useTeachingPopoverCarouselNavStyles = (
  state: TeachingPopoverCarouselNavState,
): TeachingPopoverCarouselNavState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(teachingPopoverCarouselNavClassNames.root, styles.root, state.root.className),
  },
});
