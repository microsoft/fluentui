import * as React from 'react';
import { ComponentProps, ObjectShorthandProps } from '@fluentui/react-utilities';
import { BadgeProps } from '../Badge/index';

/**
 * {@docCategory CounterBadge}
 */
export type CounterBadgeAppearance = 'filled' | 'ghost';

/**
 * {@docCategory CounterBadge}
 */
export type CounterBadgeShape = 'rounded' | 'circular';

/**
 * {@docCategory CounterBadge}
 */
export type CounterBadgeColors = 'accent' | 'warning' | 'important' | 'severe' | 'informative';

/**
 * {@docCategory CounterBadge}
 */
export interface CounterBadgeProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    Omit<BadgeProps, 'appearance' | 'shape'> {
  /**
   * A Badge can be square, circular or rounded
   * @defaultvalue circular
   */
  shape?: CounterBadgeShape;

  /**
   * A Badge can be filled, outline, ghost, inverted
   * @defaultvalue filled
   */
  appearance?: CounterBadgeAppearance;

  /**
   * A Badge can have color variations
   * @defaultvalue accent
   */
  color?: CounterBadgeColors;

  /**
   * Max number to be displayed
   * @defaultvalue 99
   */
  overflowCount?: number;

  /**
   * Value diplayed by the Badge
   * @defaultvalue 0
   */
  count?: number;

  /**
   * If 0 number should be displayed
   * @defaultvalue true
   */
  showZero?: boolean;
}

/**
 * {@docCategory CounterBadge}
 */
export interface CounterBadgeState extends CounterBadgeProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandProps<HTMLSpanElement>;

  /**
   * Max number to be displayed
   * @defaultvalue 99
   */
  overflowCount: number;

  /**
   * Value diplayed by the Badge
   * @defaultvalue 0
   */
  count: number;
}
