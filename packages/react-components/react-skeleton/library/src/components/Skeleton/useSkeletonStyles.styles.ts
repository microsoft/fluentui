import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

const useStyles = makeStyles({
  blockStyling: {
    display: 'block',
  },
});

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(
    skeletonClassNames.root,
    state.root.as === 'span' && styles.blockStyling,
    state.root.className,
  );

  return state;
};
