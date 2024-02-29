import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RatingSlots = {
  root: NonNullable<Slot<'div'>>;
  ratingLabel?: NonNullable<Slot<'label'>>;
  ratingCountLabel?: NonNullable<Slot<'label'>>;
};

/**
 * Rating Props
 */
export type RatingProps = ComponentProps<RatingSlots> & {
  /**
   * Controls the appearance of the Rating.
   * @default neutral
   */
  color?: 'brand' | 'marigold' | 'neutral';
  /**
   * Default value of the Rating
   */
  defaultValue?: number;
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
   * The mode of the rating.
   * @default 'interactive'
   */
  mode?: 'interactive' | 'read-only' | 'read-only-compact';
  /**
   * Name for the Radio inputs. If not provided, one will be automatically generated
   */
  name?: string;
  /**
   * Callback when the rating value is changed by the user.
   */
  onChange?: (ev: React.SyntheticEvent | Event, data: RatingOnChangeData) => void;
  /**
   * Sets the precision to allow half-filled shapes in Rating
   * @default 1
   */
  step?: 0.5 | 1;
  /**
   * Sets the size of the Rating items.
   * @default medium
   */
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  /**
   * The value of the rating
   */
  value?: number;
};

/**
 * Data for the onChange event for Rating.
 */
export type RatingOnChangeData = {
  /**
   * The new value of the rating.
   */
  value?: number;
};

/**
 * State used in rendering Rating
 */
export type RatingState = ComponentState<RatingSlots> &
  Required<Pick<RatingProps, 'color' | 'iconFilled' | 'iconOutline' | 'mode' | 'name' | 'step' | 'size' | 'value'>> & {
    hoveredValue?: number | undefined;
  };

export type RatingContextValue = Pick<
  RatingState,
  'color' | 'iconFilled' | 'iconOutline' | 'mode' | 'name' | 'step' | 'size' | 'value' | 'hoveredValue'
>;

export type RatingContextValues = {
  rating: RatingContextValue;
};
