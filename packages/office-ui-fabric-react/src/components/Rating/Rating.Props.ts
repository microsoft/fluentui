import * as React from 'react';

/**
 * Rating component props.
 */
export interface IRatingProps extends React.HTMLProps<HTMLElement> {
  /**
   * Selected rating
   */
  rating?: number;

  /**
   * Minimum rating, defaults to 1, has to be >= 0
   */
  min?: number;

  /**
   * Maximum rating, defaults to 5, has to be <= min
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
   * Optional text for star ratings, will be read by screen readers, defaults to 'Star'.
   */
  ratingText?: string;
}

export enum RatingSize {
  Small,
  Large
}