import { mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as styles from './AvatarGroup.module.css';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
};

export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  state.root.className = mergeClasses(
    avatarGroupClassNames.root,
    styles.root,
    state.layout === 'pie' && styles.pie,
    state.layout === 'pie' && styles[`size${state.size}`],
    state.root.className,
  );
  return state;
};
