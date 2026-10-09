import type {
  CounterBadgeProps as CounterBadgeHeadlessProps,
  CounterBadgeState as CounterBadgeHeadlessState,
} from '@fluentui/react-headless-components-preview/badge';

import type { BadgeColor, BadgeSize } from '../Badge/Badge.types';

export type { BadgeSlots } from '@fluentui/react-headless-components-preview/badge';

/** Visual style of the CounterBadge. `'filled'` is the base look. */
export type CounterBadgeAppearance = 'filled' | 'ghost';

/** Preset color of the CounterBadge — the subset Griffel's CounterBadge exposes. */
export type CounterBadgeColor = Extract<BadgeColor, 'brand' | 'danger' | 'important' | 'informative'>;

/** Corner treatment of the CounterBadge. `'circular'` is the base look. */
export type CounterBadgeShape = 'circular' | 'rounded';

/**
 * Windmod CounterBadge props: the headless counter badge plus the look props the headless
 * surface deliberately omits (they exist purely to select styles).
 */
export type CounterBadgeProps = CounterBadgeHeadlessProps & {
  /** @default 'filled' */
  appearance?: CounterBadgeAppearance;
  /** @default 'brand' */
  color?: CounterBadgeColor;
  /** @default 'circular' */
  shape?: CounterBadgeShape;
  /** @default 'medium' */
  size?: BadgeSize;
};

/** Windmod CounterBadge state: headless state plus the resolved look props. */
export type CounterBadgeState = CounterBadgeHeadlessState &
  Required<Pick<CounterBadgeProps, 'appearance' | 'color' | 'shape' | 'size'>>;
