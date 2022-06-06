import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useSizeStyles } from '../Avatar/useAvatarStyles';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
  overflowSurface: 'fui-AvatarGroup__overflowSurface',
  overflowList: 'fui-AvatarGroup__overflowList',
  overflowButton: 'fui-AvatarGroup__overflowButton',
};

/**
 * Styles for the root slot.
 */
const useStyles = makeStyles({
  base: {
    display: 'inline-flex',
    position: 'relative',
  },
});

const useOverflowListStyles = makeStyles({
  base: {
    listStyleType: 'none',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
  },
});

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const { size } = state;
  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const overflowListStyles = useOverflowListStyles();

  state.root.className = mergeClasses(avatarGroupClassNames.root, styles.base, state.root.className);

  if (state.overflowSurface) {
    state.overflowSurface.className = mergeClasses(
      avatarGroupClassNames.overflowSurface,
      state.overflowSurface.className,
    );
  }

  if (state.overflowList) {
    state.overflowList.className = mergeClasses(
      avatarGroupClassNames.overflowList,
      overflowListStyles.base,
      state.overflowList.className,
    );
  }

  if (state.overflowButton) {
    state.overflowButton.className = mergeClasses(
      avatarGroupClassNames.overflowButton,
      sizeStyles[size],
      state.overflowButton.className,
    );
  }

  return state;
};
