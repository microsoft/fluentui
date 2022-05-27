import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  label: 'fui-AvatarGroupItem__label',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'flex',
  },
  overflowItem: {
    '&:not(:first-child)': {
      marginTop: tokens.spacingVerticalS,
    },
  },
});

/**
 * Styles for the label slot
 */
const useLabelStyles = makeStyles({
  overflowItem: {
    marginLeft: tokens.spacingHorizontalS,
    position: 'relative',
  },
});

/**
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { isOverflowItem } = state;

  const rootStyles = useRootStyles();
  const labelStyles = useLabelStyles();

  state.root.className = mergeClasses(
    avatarGroupItemClassNames.root,
    rootStyles.base,
    isOverflowItem && rootStyles.overflowItem,
    state.root.className,
  );

  state.avatar.className = mergeClasses(avatarGroupItemClassNames.avatar, state.avatar.className);

  if (state.label) {
    state.label.className = mergeClasses(
      avatarGroupItemClassNames.label,
      isOverflowItem && labelStyles.overflowItem,
      state.label.className,
    );
  }

  return state;
};
