import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IRating {}

/**
 * Rating component props.
 */
export interface IRatingProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IRating interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IRating>;

  /**
   * Selected rating, has to be an integer between min and max
   */
  rating?: number;

  /**
   * Minimum rating, defaults to 1, has to be \>= 0
   * @deprecated No longer used.
   */
  min?: number;

  /**
   * Maximum rating, defaults to 5, has to be \>= min
   */
  max?: number;

  /**
   * Allow the rating value to be set to 0 instead of a minimum of 1.
   */
  allowZeroStars?: boolean;

  /**
   * Custom icon
   * @defaultvalue FavoriteStarFill
   */
  icon?: string;

  /**
   * Custom icon for unselected rating elements.
   * If an `icon` property is provided, defaults to the value of the `icon` property.
   * @defaultvalue FavoriteStarFill
   */
  unselectedIcon?: string;

  /**
   * Size of rating, defaults to small
   */
  size?: RatingSize;

  /**
   * Callback issued when the rating changes.
   */
  onChange?: (event: React.FocusEvent<HTMLElement>, rating?: number) => void;

  /**
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (rating: number) => void;

  /**
   * Optional label format for star ratings, will be read by screen readers, defaults to ''.
   * Can be used like "\{0\} of \{1\} stars selected".
   * Where \{0\} will be subsituted by the current rating and \{1\} will be subsituted by the max rating.
   */
  ariaLabelFormat?: string;

  /**
   * Deprecated: Optional id of label describing this instance of Rating. Use `getAriaLabel` instead.
   * @deprecated Use `getAriaLabel` instead.
   */
  ariaLabelId?: string;

  /**
   * Optional flag to mark rating control as readOnly
   */
  readOnly?: boolean;

  /*
   * Optional callback to set the arialabel for rating control.
   */
  getAriaLabel?: (rating: number, max: number) => string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IRatingStyleProps, IRatingStyles>;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
}

export enum RatingSize {
  Small = 0,
  Large = 1
}

export interface IRatingStyleProps {
  disabled?: boolean;
  readOnly?: boolean;
  theme: ITheme;
}

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
