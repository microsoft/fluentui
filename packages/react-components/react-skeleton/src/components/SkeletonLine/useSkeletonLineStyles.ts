import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonLineSlots, SkeletonLineState } from './SkeletonLine.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const SkeletonLineClassNames: SlotClassNames<SkeletonLineSlots> = {
  root: 'fui-SkeletonLine',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    height: '16px',
    width: '100%',
    alignItems: 'center',
  },
});

/**
 * Apply styling to the SkeletonLine slots based on the state
 */
export const useSkeletonLineStyles_unstable = (state: SkeletonLineState): SkeletonLineState => {
  const { height, width, verticalAlign } = state;

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(SkeletonLineClassNames.root, rootStyles.root, state.root.className);

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
