export { CounterBadge } from './CounterBadge';
export type {
  CounterBadgeBaseProps,
  CounterBadgeBaseState,
  CounterBadgeProps,
  CounterBadgeState,
} from './CounterBadge.types';
export { useCounterBadge_unstable, useCounterBadgeBase_unstable } from './useCounterBadge';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `counterBadgeClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { counterBadgeClassNames, useCounterBadgeStyles_unstable } from './useCounterBadgeStyles.styles';
