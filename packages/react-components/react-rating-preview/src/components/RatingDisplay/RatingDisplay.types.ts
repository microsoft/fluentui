import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RatingDisplaySlots = {
  root: NonNullable<Slot<'div'>>;
  ratingDisplayLabel?: NonNullable<Slot<'label'>>;
  ratingDisplayCountLabel?: NonNullable<Slot<'label'>>;
};

/**
 * RatingDisplay Props
 */
export type RatingDisplayProps = ComponentProps<RatingDisplaySlots> & {
  /**
   * Controls the appearance of the RatingDisplay.
   * @default neutral
   */
  color?: 'brand' | 'marigold' | 'neutral';
  /**
   * Whether the RatingDisplay renders as compact.
   * @default false
   */
  compact?: boolean;
  /**
   * The icon to display when the rating value is greater than or equal to the item's value.
   */
  iconFilled?: React.ReactElement;
  /**
   * The icon to display when the rating value is less than the item's value.
   */
  iconOutline?: React.ReactElement;
  /**
   * The max value of the rating. This controls the number of rating items displayed.
   * Must be a whole number greater than 1.
   * @default 5
   */
  max?: number;
  /**
   * Name for the Radio inputs. If not provided, one will be automatically generated
   */
  name?: string;
  /**
   * Sets the precision to allow half-filled shapes in RatingDisplay
   * @default 1
   */
  step?: 0.5 | 1;
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
  Required<
    Pick<RatingDisplayProps, 'color' | 'compact' | 'iconFilled' | 'iconOutline' | 'name' | 'step' | 'size' | 'value'>
  >;

export type RatingDisplayContextValue = Pick<
  RatingDisplayState,
  'color' | 'compact' | 'iconFilled' | 'iconOutline' | 'name' | 'step' | 'size' | 'value'
>;

export type RatingDisplayContextValues = {
  ratingDisplay: RatingDisplayContextValue;
};
