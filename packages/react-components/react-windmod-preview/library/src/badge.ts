export { Badge, badgeClassNames, useBadgeStyles } from './components/Badge';
export type {
  BadgeAppearance,
  BadgeColor,
  BadgeProps,
  BadgeShape,
  BadgeSize,
  BadgeSlots,
  BadgeState,
} from './components/Badge';

export { CounterBadge, counterBadgeClassNames, useCounterBadgeStyles } from './components/CounterBadge';
export type {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeProps,
  CounterBadgeShape,
  CounterBadgeState,
} from './components/CounterBadge';

/** Headless building blocks, re-exported for consumers composing their own Badge. */
export {
  renderBadge,
  renderCounterBadge,
  useBadge,
  useCounterBadge,
} from '@fluentui/react-headless-components-preview/badge';
