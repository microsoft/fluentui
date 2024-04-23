import * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import { RatingItemContextValue } from '../RatingItem/RatingItem.types';

export type RatingSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * Rating Props
 */
export type RatingProps = Omit<ComponentProps<Partial<RatingSlots>>, 'onChange'> & {
  /**
   * Controls the color of the Rating.
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
  iconFilled?: React.ElementType;
  /**
   * The icon to display when the rating value is less than the item's value.
   */
  iconOutline?: React.ElementType;
  /**
   * Prop to generate the aria-label for the rating inputs.
   * @default (rating) =\> `${rating}`
   */
  itemLabel?: (rating: number) => string;
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
   * Callback when the rating value is changed by the user.
   */
  onChange?: EventHandler<RatingOnChangeEventData>;
  /**
   * Sets the precision to allow half-filled shapes in Rating
   * @default 1
   */
  step?: 0.5 | 1;
  /**
   * Sets the size of the Rating items.
   * @default extra-large
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
export type RatingOnChangeEventData = EventData<'change', React.FormEvent<HTMLDivElement>> & {
  /**
   * The new value of the rating.
   */
  value: number;
};

/**
 * State used in rendering Rating
 */
export type RatingState = ComponentState<RatingSlots> &
  Required<Pick<RatingProps, 'color' | 'iconFilled' | 'iconOutline' | 'name' | 'step' | 'size' | 'value'>> &
  Pick<RatingProps, 'itemLabel'> & {
    hoveredValue?: number | undefined;
  };

export type RatingContextValues = {
  ratingItem: RatingItemContextValue;
};
