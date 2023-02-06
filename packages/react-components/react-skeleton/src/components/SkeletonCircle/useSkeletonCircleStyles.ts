import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SkeletonCircleSlots, SkeletonCircleState } from './SkeletonCircle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const skeletonCircleClassNames: SlotClassNames<SkeletonCircleSlots> = {
  root: 'fui-SkeletonCircle',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('50%'),
    ...shorthands.borderColor(tokens.colorNeutralStencil1),

    '@media screen and (forced-colors:active)': {
      ...shorthands.borderColor('Window'),
    },
  },
});

/**
 * Apply styling to the SkeletonCircle slots based on the state
 */
export const useSkeletonCircleStyles_unstable = (state: SkeletonCircleState): SkeletonCircleState => {
  const { radius } = state;

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(skeletonCircleClassNames.root, rootStyles.root, state.root.className);

  if (radius) {
    state.root.style = {
      height: radius,
      width: radius,
      ...state.root.style,
    };
  }

  return state;
};
