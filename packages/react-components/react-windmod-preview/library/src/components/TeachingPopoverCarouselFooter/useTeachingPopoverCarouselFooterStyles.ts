import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';

import styles from './TeachingPopoverCarouselFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselFooterClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-footer'),
};

/** Applies the visual contract, returning new state. */
export const useTeachingPopoverCarouselFooterStyles = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => {
  const offset = state.layout === 'offset';

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        teachingPopoverCarouselFooterClassNames.root,
        styles.root,
        offset ? styles.offset : styles.centered,
        state.root.className,
      ),
    },
    previous: slotClasses(state.previous, offset && styles.offsetButton),
    next: slotClasses(state.next, offset && styles.offsetButton),
  };
};
