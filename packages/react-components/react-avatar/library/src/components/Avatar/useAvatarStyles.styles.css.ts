import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as styles from './Avatar.module.css';
import type { AvatarSlots, AvatarState } from './Avatar.types';

export const avatarClassNames: SlotClassNames<AvatarSlots> = {
  root: 'fui-Avatar',
  image: 'fui-Avatar__image',
  initials: 'fui-Avatar__initials',
  icon: 'fui-Avatar__icon',
  badge: 'fui-Avatar__badge',
};

export const useAvatarStyles_unstable = (state: AvatarState): AvatarState => {
  const { size, shape, color, active, activeAppearance } = state;
  const hasBadge = !!state.badge;
  const hasRing = active !== 'unset' && (activeAppearance === 'ring' || activeAppearance === 'ring-shadow');
  const hasShadow = active !== 'unset' && (activeAppearance === 'shadow' || activeAppearance === 'ring-shadow');

  state.root.className = clsx(
    avatarClassNames.root,
    styles.root,
    styles[color],
    styles[`size${size}`],
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
    state.image.className = clsx(avatarClassNames.image, styles.image, state.image.className);
  }

  if (state.initials) {
    state.initials.className = clsx(
      avatarClassNames.initials,
      styles.iconInitials,
      hasBadge && styles.badgeCutout,
      state.initials.className,
    );
  }

  if (state.icon) {
    // Icon font-size is driven by `.sizeXX :global(.fui-Avatar__icon)` rules in CSS.
    state.icon.className = clsx(
      avatarClassNames.icon,
      styles.iconInitials,
      hasBadge && styles.badgeCutout,
      state.icon.className,
    );
  }

  if (state.badge) {
    state.badge.className = clsx(avatarClassNames.badge, styles.badge, state.badge.className);
  }

  return state;
};
