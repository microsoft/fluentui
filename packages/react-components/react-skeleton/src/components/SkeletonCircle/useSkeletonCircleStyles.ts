import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SkeletonCircleSlots, SkeletonCircleState } from './SkeletonCircle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const SkeletonCircleClassNames: SlotClassNames<SkeletonCircleSlots> = {
  root: 'fui-SkeletonCircle',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    alignItems: 'center',
    boxSizing: 'border-box',
    ...shorthands.borderRadius('50%'),
    ...shorthands.borderColor(tokens.colorNeutralStencil1),
    backgroundColor: tokens.colorNeutralStencil1,

    '@media screen and (forced-colors:active)': {
      ...shorthands.borderColor('Window'),
    },
  },
});

/**
 * Apply styling to the SkeletonCircle slots based on the state
 */
export const useSkeletonCircleStyles_unstable = (state: SkeletonCircleState): SkeletonCircleState => {
  const { height, verticalAlign } = state;

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(SkeletonCircleClassNames.root, rootStyles.root, state.root.className);

  if (height) {
    state.root.style = {
      height,
      width: height,
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
