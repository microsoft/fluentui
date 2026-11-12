import styles from './StackShim.module.css';

export const useStackStyles = (): {
  root: string;
  horizontal: string;
  verticalFill: string;
  reversedVertical: string;
  reversedHorizontal: string;
  disableShrink: string;
  wrap: string;
  inner: string;
  innerWidth: string;
} => ({
  root: styles.root,
  horizontal: styles.horizontal,
  verticalFill: styles.verticalFill,
  reversedVertical: styles.reversedVertical,
  reversedHorizontal: styles.reversedHorizontal,
  disableShrink: styles.disableShrink,
  wrap: styles.wrap,
  inner: styles.inner,
  innerWidth: styles.innerWidth,
});

// The helper hooks keep the Griffel return shape: a map keyed by the prop value.
export const useFlexGrowStyles = (): Record<string, string> => ({
  inherit: styles.growInherit,
  initial: styles.growInitial,
  revert: styles.growRevert,
  unset: styles.growUnset,
  '1': styles.grow1,
  '2': styles.grow2,
  '3': styles.grow3,
});

export const useFlexAlignItemsStyles = (): Record<string, string> => ({
  baseline: styles.alignItemsBaseline,
  center: styles.alignItemsCenter,
  start: styles.alignItemsStart,
  end: styles.alignItemsEnd,
  stretch: styles.alignItemsStretch,
  'space-between': styles.alignItemsSpaceBetween,
  'space-around': styles.alignItemsSpaceAround,
  'space-evenly': styles.alignItemsSpaceEvenly,
});

export const useFlexJustifyContentStyles = (): Record<string, string> => ({
  baseline: styles.justifyContentBaseline,
  center: styles.justifyContentCenter,
  start: styles.justifyContentStart,
  end: styles.justifyContentEnd,
  stretch: styles.justifyContentStretch,
  'space-between': styles.justifyContentSpaceBetween,
  'space-around': styles.justifyContentSpaceAround,
  'space-evenly': styles.justifyContentSpaceEvenly,
});
