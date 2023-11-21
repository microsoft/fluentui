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
   * Sets whether to render a full or compact Rating
   * @default false
   */
  compact?: boolean;
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
   * The max value of the rating.
   * @default 5
   */
  max?: number;
  /**
   * Name for the Radio inputs. If not provided, one will be automatically generated
   */
  name?: string;
  /**
   * Callback when the rating value is changed by the user.
   */
  onChange?: (ev: React.SyntheticEvent | Event, data: RatingOnChangeData) => void;
  /**
   * Sets the background color of the rating to be transparent or filled.
   * @default outline
   */
  outlineStyle?: 'filled' | 'outline';
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
    | 'compact'
    | 'defaultValue'
    | 'iconFilled'
    | 'iconOutline'
    | 'name'
    | 'outlineStyle'
    | 'precision'
    | 'readOnly'
    | 'value'
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
  | 'outlineStyle'
  | 'precision'
  | 'readOnly'
  | 'size'
  | 'value'
  | 'hoveredValue'
>;

export type RatingContextValues = {
  rating: RatingContextValue;
};
