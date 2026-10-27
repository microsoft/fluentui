import styles from './StackItemShim.module.css';

export const useStackItemShimStyles = (): { root: string; disableShrink: string; verticalFill: string } => ({
  root: styles.root,
  disableShrink: styles.disableShrink,
  verticalFill: styles.verticalFill,
});

// The helper hooks keep the Griffel return shape: a map keyed by the prop value.
export const useFlexAlignSelfStyles = (): Record<string, string> => ({
  auto: styles.alignSelfAuto,
  baseline: styles.alignSelfBaseline,
  center: styles.alignSelfCenter,
  start: styles.alignSelfStart,
  end: styles.alignSelfEnd,
  stretch: styles.alignSelfStretch,
});

export const useFlexGrowStyles = (): Record<string, string> => ({
  inherit: styles.growInherit,
  initial: styles.growInitial,
  revert: styles.growRevert,
  unset: styles.growUnset,
  '1': styles.grow1,
  '2': styles.grow2,
  '3': styles.grow3,
});

export const useFlexShrinkStyles = (): Record<string, string> => ({
  inherit: styles.shrinkInherit,
  initial: styles.shrinkInitial,
  revert: styles.shrinkRevert,
  unset: styles.shrinkUnset,
  '0': styles.shrink0,
  '1': styles.shrink1,
  '2': styles.shrink2,
});

export const useFlexOrderStyles = (): Record<string, string> => ({
  inherit: styles.orderInherit,
  initial: styles.orderInitial,
  unset: styles.orderUnset,
  revert: styles.orderRevert,
  '-3': styles.orderMinus3,
  '-2': styles.orderMinus2,
  '-1': styles.orderMinus1,
  '0': styles.order0,
  '1': styles.order1,
  '2': styles.order2,
  '3': styles.order3,
});
