import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { AvatarSize, AvatarState } from './Avatar.types';

import styles from './Avatar.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const avatarClassNames: { root: string } = {
  root: componentMarkers('avatar'),
};

type AvatarRootDataAttributes = {
  'data-size'?: AvatarState['size'];
};

// Every size-dependent value except the box edge is a bucket, so the fourteen sizes collapse to
// these five ladders plus the root's typed attr(). Each boundary is inclusive.
const textClass = (size: AvatarSize) => {
  if (size <= 24) {
    return styles.textCaption2Strong;
  }
  if (size <= 28) {
    return styles.textCaption1Strong;
  }
  if (size <= 40) {
    return undefined;
  }
  if (size <= 56) {
    return styles.textSubtitle2;
  }
  if (size <= 96) {
    return styles.textSubtitle1;
  }
  return styles.textTitle3;
};

const squareClass = (size: AvatarSize) => {
  if (size <= 24) {
    return styles.squareSmall;
  }
  if (size <= 48) {
    return styles.squareMedium;
  }
  if (size <= 72) {
    return styles.squareLarge;
  }
  return styles.squareXLarge;
};

const ringClass = (size: AvatarSize) => {
  if (size <= 48) {
    return styles.ringThick;
  }
  if (size <= 64) {
    return styles.ringThicker;
  }
  return styles.ringThickest;
};

const shadowClass = (size: AvatarSize) => {
  if (size <= 28) {
    return styles.shadow4;
  }
  if (size <= 48) {
    return styles.shadow8;
  }
  if (size <= 64) {
    return styles.shadow16;
  }
  return styles.shadow28;
};

const iconClass = (size: AvatarSize) => {
  if (size <= 16) {
    return styles.icon12;
  }
  if (size <= 24) {
    return styles.icon16;
  }
  if (size <= 40) {
    return styles.icon20;
  }
  if (size <= 48) {
    return styles.icon24;
  }
  if (size <= 56) {
    return styles.icon28;
  }
  if (size <= 72) {
    return styles.icon32;
  }
  return styles.icon48;
};

/**
 * Applies the visual contract, returning new state. The headless hook stamps no attributes at
 * all; `data-size` is the only one added here, because the root's box edge is the one value CSS
 * cannot bucket. Shape, active state, appearance and colour stay module-class axes — each is
 * resolved in JS before the class list is built, and block order carries their cascade.
 *
 * The colour class sits on the root and declares custom properties alone; the image, initials and
 * icon slots read them. Painting the colours on the root itself would give it a background it
 * must not have.
 */
export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const { active, activeAppearance, color, shape, size } = state;
  const animated = active === 'active' || active === 'inactive';
  const ring = animated && (activeAppearance === 'ring' || activeAppearance === 'ring-shadow');
  const shadow = animated && (activeAppearance === 'shadow' || activeAppearance === 'ring-shadow');

  const root: AvatarState['root'] & AvatarRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      avatarClassNames.root,
      styles.root,
      textClass(size),
      shape === 'square' && squareClass(size),
      animated && styles.activeOrInactive,
      ring && [styles.ring, ringClass(size)],
      shadow && [styles.shadow, shadowClass(size)],
      active === 'inactive' && styles.inactive,
      styles[color],
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    image: slotClasses(state.image, styles.image),
    initials: slotClasses(state.initials, styles.iconInitials),
    icon: slotClasses(state.icon, styles.iconInitials, iconClass(size)),
  };
};
