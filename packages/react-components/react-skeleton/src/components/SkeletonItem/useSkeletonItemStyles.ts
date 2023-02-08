import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SkeletonItemSlots, SkeletonItemState } from './SkeletonItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const skeletonItemClassNames: SlotClassNames<SkeletonItemSlots> = {
  root: 'fui-SkeletonItem',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('2px'),
  },
});

const useRectangleStyles = makeStyles({
  8: { height: '8px' },
  12: { height: '12px' },
  16: { height: '16px' },
  20: { height: '20px' },
  24: { height: '24px' },
  28: { height: '28px' },
  32: { height: '32px' },
  36: { height: '36px' },
  40: { height: '40px' },
  48: { height: '48px' },
  56: { height: '56px' },
  64: { height: '64px' },
  72: { height: '72px' },
  96: { height: '96px' },
  120: { height: '120px' },
  128: { height: '128px' },
});

const useSquareSizeStyles = makeStyles({
  8: { width: '8px', height: '8px' },
  12: { width: '12px', height: '12px' },
  16: { width: '16px', height: '16px' },
  20: { width: '20px', height: '20px' },
  24: { width: '24px', height: '24px' },
  28: { width: '28px', height: '28px' },
  32: { width: '32px', height: '32px' },
  36: { width: '36px', height: '36px' },
  40: { width: '40px', height: '40px' },
  48: { width: '48px', height: '48px' },
  56: { width: '56px', height: '56px' },
  64: { width: '64px', height: '64px' },
  72: { width: '72px', height: '72px' },
  96: { width: '96px', height: '96px' },
  120: { width: '120px', height: '120px' },
  128: { width: '128px', height: '128px' },
});

const useCircleSizeStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('50%'),
  },
  8: { width: '8px', height: '8px' },
  12: { width: '12px', height: '12px' },
  16: { width: '16px', height: '16px' },
  20: { width: '20px', height: '20px' },
  24: { width: '24px', height: '24px' },
  28: { width: '28px', height: '28px' },
  32: { width: '32px', height: '32px' },
  36: { width: '36px', height: '36px' },
  40: { width: '40px', height: '40px' },
  48: { width: '48px', height: '48px' },
  56: { width: '56px', height: '56px' },
  64: { width: '64px', height: '64px' },
  72: { width: '72px', height: '72px' },
  96: { width: '96px', height: '96px' },
  120: { width: '120px', height: '120px' },
  128: { width: '128px', height: '128px' },
});

/**
 * Apply styling to the SkeletonItem slots based on the state
 */
export const useSkeletonItemStyles_unstable = (state: SkeletonItemState): SkeletonItemState => {
  const { size, shape } = state;

  const styles = useStyles();
  const rectStyles = useRectangleStyles();
  const squareStyles = useSquareSizeStyles();
  const circleStyles = useCircleSizeStyles();

  state.root.className = mergeClasses(
    skeletonItemClassNames.root,
    styles.root,
    shape === 'rectangle' && rectStyles[size],
    shape === 'square' && squareStyles[size],
    shape === 'circle' && circleStyles.root,
    shape === 'circle' && circleStyles[size],
    state.root.className,
  );

  return state;
};
