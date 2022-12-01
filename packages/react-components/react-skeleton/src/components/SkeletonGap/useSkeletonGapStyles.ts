import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonGapSlots, SkeletonGapState } from './SkeletonGap.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const SkeletonGapClassNames: SlotClassNames<SkeletonGapSlots> = {
  root: 'fui-SkeletonGap',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    height: '16px',
    width: '100%',
    backgroundColor: tokens.colorNeutralStencil2,
    boxSizing: 'content-box',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopColor: tokens.colorNeutralStencil2,
    borderBottomColor: tokens.colorNeutralStencil2,

    '@media screen and (forced-colors:active)': {
      backgroundColor: 'Window',
      borderTopColor: 'Window',
      borderBottomColor: 'Window',
    },
  },
});

/**
 * Apply styling to the SkeletonGap slots based on the state
 */
export const useSkeletonGapStyles_unstable = (state: SkeletonGapState): SkeletonGapState => {
  const { height, width } = state;

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(SkeletonGapClassNames.root, rootStyles.root, state.root.className);

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
