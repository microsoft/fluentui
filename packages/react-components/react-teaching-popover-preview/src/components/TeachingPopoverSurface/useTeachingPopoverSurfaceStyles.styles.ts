import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TeachingPopoverSurfaceSlots, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';
import { tokens } from '@fluentui/react-theme';

export const teachingPopoverSurfaceClassNames: SlotClassNames<TeachingPopoverSurfaceSlots> = {
  root: 'fui-TeachingPopoverSurface',
};

const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingVerticalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    maxWidth: '320px',
    width: '320px',
    boxSizing: 'border-box',
  },
});

/**
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useTeachingPopoverSurfaceStyles_unstable = (
  state: TeachingPopoverSurfaceState,
): TeachingPopoverSurfaceState => {
  const styles = useStyles();
  const updatedState = usePopoverSurfaceStyles_unstable(state);

  // Make sure to merge teaching bubble surface on top of popover styles
  updatedState.root.className = mergeClasses(
    teachingPopoverSurfaceClassNames.root,
    updatedState.root.className,
    styles.root,
    state.root.className,
  );

  return updatedState;
};
