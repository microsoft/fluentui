import { makeStyles, mergeClasses } from '@griffel/react';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  // TODO: add class names for all slots on AvatarGroupItemSlots.
  // Should be of the form `<slotName>: 'fui-AvatarGroupItem__<slotName>`
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
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(avatarGroupItemClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
