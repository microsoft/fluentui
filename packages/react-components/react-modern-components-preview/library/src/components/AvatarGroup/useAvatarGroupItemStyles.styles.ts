import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import styles from './AvatarGroupItem.module.css';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
};

/** Apply styling to the AvatarGroupItem slots. */
export const useAvatarGroupItemStyles = (state: AvatarGroupItemState): AvatarGroupItemState => {
  state.root.className = clsx(avatarGroupItemClassNames.root, styles.root, state.root.className);
  state.avatar.className = clsx(avatarGroupItemClassNames.avatar, styles.avatar, state.avatar.className);
  if (state.overflowLabel) {
    state.overflowLabel.className = clsx(
      avatarGroupItemClassNames.overflowLabel,
      styles.overflowLabel,
      state.overflowLabel.className,
    );
  }
  return state;
};
