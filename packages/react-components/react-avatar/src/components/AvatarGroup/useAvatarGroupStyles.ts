import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useSizeStyles } from '../Avatar/useAvatarStyles';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
  popoverSurface: 'fui-AvatarGroup__popoverSurface',
  popoverSurfaceList: 'fui-AvatarGroup__popoverSurfaceList',
  popoverTrigger: 'fui-AvatarGroup__popoverTrigger',
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

/**
 * Styles for the PopoverTrigger.
 */
const usePopoverTriggerStyles = makeStyles({
  base: {
    flexShrink: 0,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 'unset',
    maxHeight: 'unset',
    ...shorthands.padding(0),
  },
  pie: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),
    ':focus': {
      backgroundColor: 'transparent',
    },
  },
});

const usePopoverSurfaceListStyles = makeStyles({
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
  const { layout, size } = state;
  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const popoverTriggerStyles = usePopoverTriggerStyles();
  const popoverSurfaceListStyles = usePopoverSurfaceListStyles();

  state.root.className = mergeClasses(avatarGroupClassNames.root, styles.base, state.root.className);

  if (state.popoverSurface) {
    state.popoverSurface.className = mergeClasses(avatarGroupClassNames.popoverSurface, state.popoverSurface.className);
  }

  if (state.popoverSurfaceList) {
    state.popoverSurfaceList.className = mergeClasses(
      avatarGroupClassNames.popoverSurfaceList,
      popoverSurfaceListStyles.base,
      state.popoverSurfaceList.className,
    );
  }

  if (state.popoverTrigger) {
    state.popoverTrigger.className = mergeClasses(
      avatarGroupClassNames.popoverTrigger,
      popoverTriggerStyles.base,
      sizeStyles[size],
      layout === 'pie' && popoverTriggerStyles.pie,
      state.popoverTrigger.className,
    );
  }

  return state;
};
