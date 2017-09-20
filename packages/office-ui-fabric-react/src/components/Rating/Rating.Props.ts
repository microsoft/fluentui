import * as React from 'react';

export interface IRating {

}

/**
 * Rating component props.
 */
export interface IRatingProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IRating interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IRating) => void;

  /**
   * Selected rating, has to be an integer between min and max
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
   * Optional flag to mark rating control as readOnly
   */
  readOnly?: boolean;

  /**
   * Optional flag  enable half star. Displays half star if the value for any decimal value of the star
   */
  enableHalfStar?: boolean;
}

export enum RatingSize {
  Small = 0,
  Large = 1
}
