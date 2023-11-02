import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TeachingBubbleSurfaceSlots, TeachingBubbleSurfaceState } from './TeachingBubbleSurface.types';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';

export const teachingBubbleSurfaceClassNames: SlotClassNames<TeachingBubbleSurfaceSlots> = {
  root: 'fui-TeachingBubbleSurface',
};

const useStyles = makeStyles({
  root: {
    ...shorthands.padding('0', '16px'),
    ...shorthands.borderRadius('4px'),
    maxWidth: '320px',
    width: '320px',
    boxSizing: 'border-box',
  },
});

/**
 * Apply styling to the TeachingBubbleSurface slots based on the state
 */
export const useTeachingBubbleSurfaceStyles_unstable = (
  state: TeachingBubbleSurfaceState,
): TeachingBubbleSurfaceState => {
  const styles = useStyles();
  const updatedState = usePopoverSurfaceStyles_unstable(state);

  // Make sure to merge teaching bubble surface on top of popover styles
  updatedState.root.className = mergeClasses(
    teachingBubbleSurfaceClassNames.root,
    updatedState.root.className,
    styles.root,
    state.root.className,
  );

  return updatedState;
};
