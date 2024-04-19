import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { RatingItemContextValue } from '../RatingItem/RatingItem.types';

export type RatingDisplaySlots = {
  root: NonNullable<Slot<'div'>>;
  valueText?: Slot<'span'>;
  countText?: Slot<'span'>;
};

/**
 * RatingDisplay Props
 */
export type RatingDisplayProps = ComponentProps<RatingDisplaySlots> & {
  /**
   * Color of the rating items (stars).
   * @default neutral
   */
  color?: 'brand' | 'marigold' | 'neutral';
  /**
   * Renders a single filled star, with the value written next to it.
   * @default false
   */
  compact?: boolean;
  /**
   * The number of ratings represented by the rating value.
   * This will be formatted with a thousands separator (if applicable) and displayed next to the value.
   */
  count?: number;
  /**
   * The icon used for rating items.
   * @default StarFilled
   */
  icon?: React.ElementType;
  /**
   * The max value of the rating. This controls the number of rating items displayed.
   * Must be a whole number greater than 1.
   * @default 5
   */
  max?: number;
  /**
   * Sets the size of the RatingDisplay items.
   * @default medium
   */
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  /**
   * The value of the rating
   */
  value?: number;
};

/**
 * State used in rendering RatingDisplay
 */
export type RatingDisplayState = ComponentState<RatingDisplaySlots> &
  Required<Pick<RatingDisplayProps, 'color' | 'compact' | 'icon' | 'max' | 'size'>> &
  Pick<RatingDisplayProps, 'value'>;

export type RatingDisplayContextValues = { ratingItem: RatingItemContextValue };
