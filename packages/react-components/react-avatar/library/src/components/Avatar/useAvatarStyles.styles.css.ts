'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './Avatar.module.css';
import type { AvatarSize, AvatarSlots, AvatarState } from './Avatar.types';

export const avatarClassNames: SlotClassNames<AvatarSlots> = {
  root: 'fui-Avatar',
  image: 'fui-Avatar__image',
  initials: 'fui-Avatar__initials',
  icon: 'fui-Avatar__icon',
  badge: 'fui-Avatar__badge',
};

const avatarSizeClasses: Record<AvatarSize, string> = {
  16: styles.size16,
  20: styles.size20,
  24: styles.size24,
  28: styles.size28,
  32: styles.size32,
  36: styles.size36,
  40: styles.size40,
  48: styles.size48,
  56: styles.size56,
  64: styles.size64,
  72: styles.size72,
  96: styles.size96,
  120: styles.size120,
  128: styles.size128,
};

export const useAvatarSizes = (): Record<AvatarSize, string> => avatarSizeClasses;
export const useSizeStyles = useAvatarSizes;

export const useAvatarStyles_unstable = (state: AvatarState): AvatarState => {
  const { size, shape, color, active, activeAppearance } = state;
  const avatarSizes = useAvatarSizes();
  const hasBadge = !!state.badge;
  const hasRing = active !== 'unset' && (activeAppearance === 'ring' || activeAppearance === 'ring-shadow');
  const hasShadow = active !== 'unset' && (activeAppearance === 'shadow' || activeAppearance === 'ring-shadow');

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    avatarClassNames.root,
    styles.root,
    styles[color],
    avatarSizes[size],
    shape === 'square' && styles.square,
    hasBadge && styles.badgeAlign,
    state.badge && styles[state.badge.size ?? 'medium'],
    active !== 'unset' && styles.activeOrInactive,
    hasRing && styles.ring,
    hasBadge && hasRing && styles.ringBadgeCutout,
    hasShadow && styles.shadow,
    active === 'inactive' && styles.inactive,
    state.root.className,
  );

  if (state.image) {
    // eslint-disable-next-line react-hooks/immutability
    state.image.className = clsx(avatarClassNames.image, styles.image, state.image.className);
  }

  if (state.initials) {
    // eslint-disable-next-line react-hooks/immutability
    state.initials.className = clsx(
      avatarClassNames.initials,
      styles.iconInitials,
      hasBadge && styles.badgeCutout,
      state.initials.className,
    );
  }

  if (state.icon) {
    // Icon font-size is driven by `.sizeXX :global(.fui-Avatar__icon)` rules in CSS.
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      avatarClassNames.icon,
      styles.iconInitials,
      hasBadge && styles.badgeCutout,
      state.icon.className,
    );
  }

  if (state.badge) {
    // eslint-disable-next-line react-hooks/immutability
    state.badge.className = clsx(avatarClassNames.badge, styles.badge, state.badge.className);
  }

  return state;
};
