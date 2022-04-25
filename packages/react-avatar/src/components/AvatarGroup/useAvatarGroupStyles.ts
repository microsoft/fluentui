import { makeStyles, mergeClasses } from '@griffel/react';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
  popoverSurface: 'fui-AvatarGroup__popoverSurface',
  popoverTrigger: 'fui-AvatarGroup__popoverTrigger',
};

export const extraAvatarGroupClassNames = {
  popoverSurfaceItem: 'fui-AvatarGroup__popoverSurfaceItem',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(avatarGroupClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  if (state.popoverSurface) {
    state.popoverSurface.className = mergeClasses(avatarGroupClassNames.popoverSurface, state.popoverSurface.className);
  }

  if (state.popoverTrigger) {
    state.popoverTrigger.className = mergeClasses(avatarGroupClassNames.popoverTrigger, state.popoverTrigger.className);
  }

  return state;
};
