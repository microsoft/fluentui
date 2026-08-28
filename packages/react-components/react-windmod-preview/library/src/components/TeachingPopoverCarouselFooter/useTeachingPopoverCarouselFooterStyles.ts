import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';

import styles from './TeachingPopoverCarouselFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselFooterClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-footer'),
};

/** Applies the visual contract, returning new state. */
export const useTeachingPopoverCarouselFooterStyles = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(
      teachingPopoverCarouselFooterClassNames.root,
      styles.root,
      state.layout === 'offset' ? styles.offset : styles.centered,
      state.root.className,
    ),
  },
});
