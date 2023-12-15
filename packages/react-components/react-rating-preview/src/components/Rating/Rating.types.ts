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
   * Controls the appearance of unselected rating items.
   * @default outline (filled if readOnly is set)
   */
  appearance?: 'filled' | 'outline';
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
  mode?: 'interactive' | 'readonly' | 'readonly-compact';
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
   * @default false
   */
  precision?: boolean;
  /**
   * Sets the size of the Rating items.
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
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
  Required<
    Pick<RatingProps, 'appearance' | 'iconFilled' | 'iconOutline' | 'mode' | 'name' | 'precision' | 'size' | 'value'>
  > & {
    hoveredValue?: number | undefined;
  };

export type RatingContextValue = Pick<
  RatingState,
  'appearance' | 'iconFilled' | 'iconOutline' | 'mode' | 'name' | 'precision' | 'size' | 'value' | 'hoveredValue'
>;

export type RatingContextValues = {
  rating: RatingContextValue;
};
