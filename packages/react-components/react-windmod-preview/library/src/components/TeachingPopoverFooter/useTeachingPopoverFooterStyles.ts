import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverFooterButtonSlot, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

import styles from './TeachingPopoverFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverFooterClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-footer'),
};

/** A spread drops the call signature a slot carries for JSX, so it is restored by assertion. */
const classed = (slotProps: TeachingPopoverFooterButtonSlot, className: string): TeachingPopoverFooterButtonSlot =>
  ({ ...slotProps, className }) as TeachingPopoverFooterButtonSlot;

/**
 * Applies the visual contract, returning new state. Griffel inverts the emphasis roles under
 * brand, so the brand overrides are keyed per slot rather than per appearance — see
 * TeachingPopoverFooter.tsx, which resolves the roles.
 */
export const useTeachingPopoverFooterStyles = (state: TeachingPopoverFooterState): TeachingPopoverFooterState => {
  const isBrand = state.appearance === 'brand';
  const isHorizontal = state.footerLayout === 'horizontal';
  const buttonClass = isHorizontal ? styles.buttonHorizontal : styles.buttonVertical;

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        teachingPopoverFooterClassNames.root,
        styles.root,
        isHorizontal ? styles.horizontal : styles.vertical,
        state.root.className,
      ),
    },
    primary: classed(state.primary, clsx(buttonClass, isBrand && styles.brandPrimary, state.primary.className)),
    secondary:
      state.secondary &&
      classed(state.secondary, clsx(buttonClass, isBrand && styles.brandSecondary, state.secondary.className)),
  };
};
