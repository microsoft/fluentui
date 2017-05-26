import * as React from 'react';

export interface IRating {

}

/**
 * Rating component props.
 */
export interface IRatingProps extends React.HTMLProps<HTMLElement> {
  /**
   * Optional callback to access the IRating interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IRating) => void;

  /**
   * Selected rating, has to be an integer between min and max
   * If aggregate is not set to true, value is floored
   */
  rating?: number;

  /**
   * Minimum rating, defaults to 1, has to be >= 0
   */
  min?: number;

  /**
   * Maximum rating, defaults to 5, has to be >= min
   */
  max?: number;

  /**
   * Custom icon, defaults to FavoriteStar
   */
  icon?: string;

  /**
   * Size of rating, defaults to small
   */
  size?: RatingSize;

  /**
   * Callback when the rating has changed
   */
  onChanged?: (rating: number) => void;

  /**
   * Optional label for star ratings, will be read by screen readers, defaults to 'Star'.
   */
  ariaLabelIcon?: string;

  /**
   * Optional id of label describing this instance of Rating
   */
  ariaLabelId?: string;

  /**
   * Optional setting to represent aggregate rating values on rating control.
   * If set, rating control will be readonly rating control with partial star support.
   * Also if set, this overrides the disabled prop
   */
  aggregate?: boolean;
}

export enum RatingSize {
  Small = 0,
  Large = 1
}