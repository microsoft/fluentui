import * as React from 'react';
import type { IStyle, ITheme, IProcessedStyleSet } from '../../Styling';
import type { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Rating}
 */
export interface IRating {
  /** Current displayed rating value. Will be `min` if the user has not yet set a rating. */
  rating: number;
}

export interface IRatingStarProps {
  fillPercentage: number;
  disabled?: boolean;
  classNames: IProcessedStyleSet<IRatingStyles>;
  icon: string;
  starNum?: number;
  unselectedIcon?: string;
}

/**
 * Rating component props.
 * {@docCategory Rating}
 */
export interface IRatingProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IRating interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IRating>;

  /**
   * Current rating. Must be a number between `min` and `max`. Only provide this if the Rating
   * is a controlled component where you are maintaining its current state; otherwise, use the
   * `defaultRating` property.
   */
  rating?: number;

  /**
   * Default rating. Must be a number between `min` and `max`. Only provide this if the Rating
   * is an uncontrolled component; otherwise, use the `rating` property.
   */
  defaultRating?: number;

  /**
   * Minimum rating. Must be \>= 0.
   * @defaultvalue 0 if `allowZeroStars` is true, 1 otherwise
   * @deprecated Use `allowZeroStars` instead.
   */
  min?: number;

  /**
   * Maximum rating. Must be \>= `min`.
   * @defaultvalue 5
   */
  max?: number;

  /**
   * Allow the initial rating value (or updated values passed in through `rating`) to be 0.
   * Note that a value of 0 still won't be selectable by mouse or keyboard.
   */
  allowZeroStars?: boolean;

  /**
   * Whether the control should be disabled.
   */
  disabled?: boolean;

  /**
   * Custom icon name for selected rating elements.
   * @defaultvalue FavoriteStarFill
   */
  icon?: string;

  /**
   * Custom icon name for unselected rating elements.
   * @defaultvalue FavoriteStar
   */
  unselectedIcon?: string;

  /**
   * Optional custom renderer for the star component.
   */
  onRenderStar?: IRenderFunction<IRatingStarProps>;

  /**
   * Size of rating
   * @defaultvalue Small
   */
  size?: RatingSize;

  /**
   * Callback for when the rating changes.
   */
  onChange?: (event: React.FormEvent<HTMLElement>, rating?: number) => void;

  /**
   * Optional label format for each individual rating star (not the rating control as a whole)
   * that will be read by screen readers. Placeholder `{0}` is the current rating and placeholder
   * `{1}` is the max: for example, `"Select {0} of {1} stars"`.
   *
   * (To set the label for the control as a whole, use `getAriaLabel` or `aria-label`.)
   *
   * @defaultvalue ''
   */
  ariaLabelFormat?: string;

  /**
   * Optional flag to mark rating control as readOnly
   */
  readOnly?: boolean;

  /**
   * Optional callback to set the aria-label for rating control in readOnly mode.
   * Also used as a fallback aria-label if ariaLabel prop is not provided.
   */
  getAriaLabel?: (rating: number, max: number) => string;

  /**
   * Optional aria-label for rating control.
   * If rating control is readOnly, it is recommended to provide a getAriaLabel prop instead
   * since otherwise the current rating value will not be read.
   */
  ariaLabel?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IRatingStyleProps, IRatingStyles>;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
}

/**
 * {@docCategory Rating}
 */
export enum RatingSize {
  Small = 0,
  Large = 1,
}

/**
 * {@docCategory Rating}
 */
export interface IRatingStyleProps {
  disabled?: boolean;
  readOnly?: boolean;
  theme: ITheme;
}

/**
 * {@docCategory Rating}
 */
export interface IRatingStyles {
  root: IStyle;
  ratingStar: IStyle;
  ratingStarBack: IStyle;
  ratingStarFront: IStyle;
  ratingButton: IStyle;
  ratingStarIsSmall: IStyle;
  ratingStarIsLarge: IStyle;
  rootIsSmall: IStyle;
  rootIsLarge: IStyle;
  labelText: IStyle;
  ratingFocusZone: IStyle;
}
