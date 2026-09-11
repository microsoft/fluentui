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

export { PresenceBadge, presenceBadgeClassNames, usePresenceBadgeStyles } from './components/PresenceBadge';
export type { PresenceBadgeProps, PresenceBadgeState, PresenceBadgeStatus } from './components/PresenceBadge';

/** Headless building blocks, re-exported for consumers composing their own Badge. */
export {
  renderBadge,
  renderCounterBadge,
  renderPresenceBadge,
  useBadge,
  useCounterBadge,
  usePresenceBadge,
} from '@fluentui/react-headless-components-preview/badge';
