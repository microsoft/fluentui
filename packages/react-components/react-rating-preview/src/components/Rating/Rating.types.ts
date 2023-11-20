import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
//import { Label } from '@fluentui/react-label';

export type RatingSlots = {
  root: NonNullable<Slot<'div'>>;
  ratingLabel?: NonNullable<Slot<'label'>>;
  ratingCountLabel?: NonNullable<Slot<'label'>>;
  //divider?: NonNullable<Slot<'span'>>;
};

/**
 * Rating Props
 */
export type RatingProps = ComponentProps<RatingSlots> & {
  /**
   * Sets whether to render a full or compact Rating
   * @default false
   */
  compact?: boolean;
  /**
   * Default value of the Rating
   */
  defaultValue?: number;
  /**
   *
   */
  iconFilled?: React.ReactElement;
  /**
   *
   */
  iconOutline?: React.ReactElement;
  /**
   * The max value of the rating.
   * @default 5
   */
  max?: number;
  /**
   * Callback when the rating value is changed by the user.
   */
  onChange?: (ev: React.SyntheticEvent | Event, data: RatingOnChangeData) => void;
  /**
   * Name for the Radio inputs. If not provided, one will be automatically generated
   */
  name?: string;
  /**
   * Sets the precision to allow half-filled shapes in Rating
   * @default false
   */
  precision?: boolean;
  /**
   * Sets Rating to be read only
   * @default false
   */
  readOnly?: boolean;
  /**
   * Sets the size of the Rating star in pixels
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
  Required<Pick<RatingProps, 'size'>> &
  Pick<
    RatingProps,
    'compact' | 'defaultValue' | 'iconFilled' | 'iconOutline' | 'name' | 'precision' | 'readOnly' | 'value'
  > & {
    hoveredValue?: number | undefined;
  };

export type RatingContextValue = Pick<
  RatingState,
  | 'compact'
  | 'defaultValue'
  | 'iconFilled'
  | 'iconOutline'
  | 'name'
  | 'precision'
  | 'readOnly'
  | 'size'
  | 'value'
  | 'hoveredValue'
>;

export type RatingContextValues = {
  rating: RatingContextValue;
};
