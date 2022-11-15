import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonCircleSlots, SkeletonCircleState } from './SkeletonCircle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const SkeletonCircleClassNames: SlotClassNames<SkeletonCircleSlots> = {
  root: 'fui-SkeletonCircle',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    height: '24px',
    width: '100%',
    alignItems: 'center',
    borderRadius: '4px',
  },
});

/**
 * Apply styling to the SkeletonCircle slots based on the state
 */
export const useSkeletonCircleStyles_unstable = (state: SkeletonCircleState): SkeletonCircleState => {
  const { height, width, verticalAlign } = state;

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(SkeletonCircleClassNames.root, rootStyles.root, state.root.className);

  if (height) {
    state.root.style = {
      height,
      ...state.root.style,
    };
  }

  if (width) {
    state.root.style = {
      width,
      ...state.root.style,
    };
  }
  if (verticalAlign) {
    state.root.style = {
      alignItems: verticalAlign,
      ...state.root.style,
    };
  }

  return state;
};
