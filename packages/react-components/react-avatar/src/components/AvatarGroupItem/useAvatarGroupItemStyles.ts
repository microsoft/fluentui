import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
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
      ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingVerticalXS),
    },
  },
});

/**
 * Styles for the label slot
 */
const useOverflowLabelStyles = makeStyles({
  overflowItem: {
    marginLeft: tokens.spacingHorizontalS,
  },
});

/**
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { isOverflowItem } = state;

  const rootStyles = useRootStyles();
  const overflowLabelStyles = useOverflowLabelStyles();

  state.root.className = mergeClasses(
    avatarGroupItemClassNames.root,
    rootStyles.base,
    isOverflowItem && rootStyles.overflowItem,
    state.root.className,
  );

  state.avatar.className = mergeClasses(avatarGroupItemClassNames.avatar, state.avatar.className);

  if (state.overflowLabel) {
    state.overflowLabel.className = mergeClasses(
      avatarGroupItemClassNames.overflowLabel,
      isOverflowItem && overflowLabelStyles.overflowItem,
      state.overflowLabel.className,
    );
  }

  return state;
};
