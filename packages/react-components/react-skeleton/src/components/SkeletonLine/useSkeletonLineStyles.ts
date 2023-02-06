import { mergeClasses } from '@griffel/react';
import type { SkeletonLineSlots, SkeletonLineState } from './SkeletonLine.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const skeletonLineClassNames: SlotClassNames<SkeletonLineSlots> = {
  root: 'fui-SkeletonLine',
};

/**
 * Apply styling to the SkeletonLine slots based on the state
 */
export const useSkeletonLineStyles_unstable = (state: SkeletonLineState): SkeletonLineState => {
  const { height, width } = state;

  state.root.className = mergeClasses(skeletonLineClassNames.root, state.root.className);

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

  return state;
};
