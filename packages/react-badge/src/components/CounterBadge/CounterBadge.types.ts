import type { BadgeProps, BadgeState } from '../Badge/index';

export type CounterBadgeCommons = {
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
};

/**
 * {@docCategory CounterBadge}
 */
export type CounterBadgeProps = Omit<BadgeProps, 'appearance' | 'shape'> & Partial<CounterBadgeCommons>;

/**
 * {@docCategory CounterBadge}
 */
export type CounterBadgeState = Omit<BadgeState, 'appearance' | 'shape'> & CounterBadgeCommons;
