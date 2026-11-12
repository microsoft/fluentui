'use client';

import { clsx } from 'clsx';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { SlotClassNames } from '@fluentui/react-utilities';
import sizes from '../AvatarGroup/AvatarGroup.module.css';
import styles from './AvatarGroupItem.module.css';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';
import type { AvatarSize } from '../Avatar/Avatar.types';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
};

export const useGroupChildClassName = (layout: AvatarGroupProps['layout'], size: AvatarSize): string =>
  clsx(sizes[`size${size}`], layout && styles[layout]);

export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { dir } = useFluent_unstable();
  const groupChildClassName = useGroupChildClassName(state.layout, state.size);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    avatarGroupItemClassNames.root,
    styles.root,
    state.isOverflowItem ? styles.overflowItem : styles.nonOverflowItem,
    state.isOverflowItem ? state.layout && styles[state.layout] : groupChildClassName,
    dir === 'rtl' && styles.rtl,
    state.root.className,
  );
  // eslint-disable-next-line react-hooks/immutability
  state.avatar.className = clsx(avatarGroupItemClassNames.avatar, styles.avatar, state.avatar.className);
  if (state.overflowLabel) {
    // eslint-disable-next-line react-hooks/immutability
    state.overflowLabel.className = clsx(
      avatarGroupItemClassNames.overflowLabel,
      styles.overflowLabel,
      state.overflowLabel.className,
    );
  }
  return state;
};
