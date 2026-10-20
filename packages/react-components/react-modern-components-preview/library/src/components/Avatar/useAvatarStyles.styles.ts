import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AvatarSlots, AvatarState } from './Avatar.types';
import styles from './Avatar.module.css';

export const avatarClassNames: SlotClassNames<AvatarSlots> = {
  root: 'fui-Avatar',
  image: 'fui-Avatar__image',
  initials: 'fui-Avatar__initials',
  icon: 'fui-Avatar__icon',
  badge: 'fui-Avatar__badge',
};

/**
 * Apply styling to the Avatar slots based on the state.
 */
export const useAvatarStyles = (state: AvatarState): AvatarState => {
  state.root.className = clsx(avatarClassNames.root, styles.root, state.root.className);

  if (state.image) {
    state.image.className = clsx(avatarClassNames.image, styles.image, state.image.className);
  }

  if (state.initials) {
    state.initials.className = clsx(avatarClassNames.initials, styles.initials, state.initials.className);
  }

  if (state.icon) {
    state.icon.className = clsx(avatarClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.badge) {
    state.badge.className = clsx(avatarClassNames.badge, styles.badge, state.badge.className);
  }

  return state;
};
