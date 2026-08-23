import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
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
const textClass = (size: AvatarSize) =>
  size <= 24
    ? styles.textCaption2Strong
    : size <= 28
      ? styles.textCaption1Strong
      : size <= 40
        ? undefined
        : size <= 56
          ? styles.textSubtitle2
          : size <= 96
            ? styles.textSubtitle1
            : styles.textTitle3;

const squareClass = (size: AvatarSize) =>
  size <= 24
    ? styles.squareSmall
    : size <= 48
      ? styles.squareMedium
      : size <= 72
        ? styles.squareLarge
        : styles.squareXLarge;

const ringClass = (size: AvatarSize) =>
  size <= 48 ? styles.ringThick : size <= 64 ? styles.ringThicker : styles.ringThickest;

const shadowClass = (size: AvatarSize) =>
  size <= 28 ? styles.shadow4 : size <= 48 ? styles.shadow8 : size <= 64 ? styles.shadow16 : styles.shadow28;

const iconClass = (size: AvatarSize) =>
  size <= 16
    ? styles.icon12
    : size <= 24
      ? styles.icon16
      : size <= 40
        ? styles.icon20
        : size <= 48
          ? styles.icon24
          : size <= 56
            ? styles.icon28
            : size <= 72
              ? styles.icon32
              : styles.icon48;

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
    image: state.image && { ...state.image, className: clsx(styles.image, state.image.className) },
    initials: state.initials && {
      ...state.initials,
      className: clsx(styles.iconInitials, state.initials.className),
    },
    icon: state.icon && {
      ...state.icon,
      className: clsx(styles.iconInitials, iconClass(size), state.icon.className),
    },
  };
};
