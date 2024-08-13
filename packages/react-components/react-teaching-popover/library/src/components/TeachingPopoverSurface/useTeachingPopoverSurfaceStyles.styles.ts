import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TeachingPopoverSurfaceSlots, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';
import { tokens } from '@fluentui/react-theme';

export const teachingPopoverSurfaceClassNames: SlotClassNames<TeachingPopoverSurfaceSlots> = {
  root: 'fui-TeachingPopoverSurface',
};

const useStyles = makeStyles({
  root: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingVerticalL}`,
    borderRadius: tokens.borderRadiusXLarge,
    width: '288px',
    boxSizing: 'content-box',
  },
});

/**
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useTeachingPopoverSurfaceStyles_unstable = (
  state: TeachingPopoverSurfaceState,
): TeachingPopoverSurfaceState => {
  'use no memo';

  const styles = useStyles();

  // Make sure to merge teaching bubble surface prior to popover styles
  state.root.className = mergeClasses(teachingPopoverSurfaceClassNames.root, styles.root, state.root.className);

  const updatedState = usePopoverSurfaceStyles_unstable(state);

  return updatedState;
};
