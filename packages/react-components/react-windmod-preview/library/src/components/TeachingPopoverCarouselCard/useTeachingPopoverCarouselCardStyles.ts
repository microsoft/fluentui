import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverCarouselCardState } from './TeachingPopoverCarouselCard.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselCardClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-card'),
};

/**
 * Applies the visual contract, returning new state. The reference's carousel card authors no rules,
 * so there is no stylesheet of its own — the marker pair is the whole contract. The card's own
 * `data-carousel-active-item` is a raw boolean and stringifies to "false" when off, so no selector
 * here or anywhere else may read it as a presence attribute.
 */
export const useTeachingPopoverCarouselCardStyles = (
  state: TeachingPopoverCarouselCardState,
): TeachingPopoverCarouselCardState => ({
  ...state,
  root: { ...state.root, className: clsx(teachingPopoverCarouselCardClassNames.root, state.root.className) },
});
