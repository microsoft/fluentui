import { makeStyles, mergeClasses } from '@griffel/react';
import type { AvatarGroupOverflowSlots, AvatarGroupOverflowState } from './AvatarGroupOverflow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupOverflowClassName = 'fui-AvatarGroupOverflow';
export const avatarGroupOverflowClassNames: SlotClassNames<AvatarGroupOverflowSlots> = {
  root: 'fui-AvatarGroupOverflow',
  // TODO: add class names for all slots on AvatarGroupOverflowSlots.
  // Should be of the form `<slotName>: 'fui-AvatarGroupOverflow__<slotName>`
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
 * Apply styling to the AvatarGroupOverflow slots based on the state
 */
export const useAvatarGroupOverflowStyles_unstable = (state: AvatarGroupOverflowState): AvatarGroupOverflowState => {
  const styles = useStyles();
  state.root.className = mergeClasses(avatarGroupOverflowClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
