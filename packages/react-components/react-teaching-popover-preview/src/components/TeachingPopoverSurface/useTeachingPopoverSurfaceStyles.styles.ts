import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverSurfaceSlots, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

export const teachingPopoverSurfaceClassNames: SlotClassNames<TeachingPopoverSurfaceSlots> = {
  root: 'fui-TeachingPopoverSurface',
  // TODO: add class names for all slots on TeachingPopoverSurfaceSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverSurface__<slotName>`
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
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useTeachingPopoverSurfaceStyles_unstable = (
  state: TeachingPopoverSurfaceState,
): TeachingPopoverSurfaceState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverSurfaceClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
