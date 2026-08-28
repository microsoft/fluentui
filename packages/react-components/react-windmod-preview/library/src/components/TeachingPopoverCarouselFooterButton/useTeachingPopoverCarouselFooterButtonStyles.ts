'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

import styles from './TeachingPopoverCarouselFooterButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverCarouselFooterButtonClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-carousel-footer-button'),
};

/**
 * Applies the visual contract on top of Button's, returning new state. The reference pins a
 * min-width here; it never reaches the page, because the Button's own size and icon-only rules
 * claim that property in every cell, so there is no rule for it.
 *
 * The root keeps Button's marker pair alongside its own — see `restackOver`.
 */
export const useTeachingPopoverCarouselFooterButtonStyles = (
  state: TeachingPopoverCarouselFooterButtonState,
): TeachingPopoverCarouselFooterButtonState => {
  const isBrand = state.popoverAppearance === 'brand';

  return restackOver(state, useButtonStyles(state), {
    marker: teachingPopoverCarouselFooterButtonClassNames.root,
    root: clsx(
      isBrand && state.navType === 'prev' && styles.brandPrevious,
      isBrand && state.navType === 'next' && styles.brandNext,
    ),
  });
};
