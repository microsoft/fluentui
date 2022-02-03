import type { BadgeProps, BadgeState } from '../Badge/index';

export type CounterBadgeCommonsUnstable = {
  /**
   * Max number to be displayed
   * @default 99
   */
  overflowCount: number;

  /**
   * Value displayed by the Badge
   * @default 0
   */
  count: number;

  /**
   * If the badge should be shown when count is 0
   * @default false
   */
  showZero: boolean;

  /**
   * If a dot should be displayed without the count
   * @default false
   */
  dot: boolean;

  /**
   * A Badge can be circular or rounded
   * @default circular
   */
  shape: 'circular' | 'rounded';

  /**
   * A Badge can be filled, ghost
   * @default filled
   */
  appearance: 'filled' | 'ghost';

  /**
   * Semantic colors for a counter badge
   * @default brand
   */
  color: Extract<BadgeProps['color'], 'brand' | 'danger' | 'important' | 'informative'>;
};

export type CounterBadgeProps = Omit<BadgeProps, 'appearance' | 'shape' | 'color'> &
  Partial<CounterBadgeCommonsUnstable>;

export type CounterBadgeState = Omit<BadgeState, 'appearance' | 'shape' | 'color'> & CounterBadgeCommonsUnstable;
