import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import styles from './AvatarGroup.module.css';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
};

/** Apply styling to the AvatarGroup slots. */
export const useAvatarGroupStyles = (state: AvatarGroupState): AvatarGroupState => {
  state.root.className = clsx(avatarGroupClassNames.root, styles.root, state.root.className);
  return state;
};
