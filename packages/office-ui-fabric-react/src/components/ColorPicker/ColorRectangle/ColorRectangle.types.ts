import * as React from 'react';
import { ITheme, IStyle } from '../../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../../Utilities';
import { IColor } from '../../../utilities/color/interfaces';

/**
 * {@docCategory ColorPicker}
 */
export interface IColorRectangle {
  /** Currently selected color. */
  color: IColor;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorRectangleProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IColorRectangle>;

  /**
   * Current color of the rectangle.
   */
  color: IColor;

  /**
   * Minimum width and height.
   */
  minSize?: number;

  /**
   * Additional CSS class(es) to apply to the ColorRectangle.
   */
  className?: string;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IColorRectangleStyleProps, IColorRectangleStyles>;

  /**
   * Callback for when the color changes.
   */
  onChange?: (ev: React.MouseEvent<HTMLElement>, color: IColor) => void;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorRectangleStyleProps {
  /**
   * Theme (provided through customization).
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the ColorRectangle.
   */
  className?: string;

  /**
   * Minimum width and height.
   */
  minSize?: number;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorRectangleStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the light-colored rectangle.
   */
  light?: IStyle;

  /**
   * Style set for the dark-colored rectangle.
   */
  dark?: IStyle;

  /**
   * Style set for the draggable thumb element.
   */
  thumb?: IStyle;
}
