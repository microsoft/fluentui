import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel'),
};

/**
 * Applies the visual contract, returning new state. The reference's carousel authors no rules, so
 * there is no stylesheet of its own — the marker pair is the whole contract.
 */
export const useTeachingPopoverCarouselStyles = (
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselState => ({
  ...state,
  root: { ...state.root, className: clsx(teachingPopoverCarouselClassNames.root, state.root.className) },
});
