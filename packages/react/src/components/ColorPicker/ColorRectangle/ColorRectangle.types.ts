import * as React from 'react';
import type { ITheme, IStyle } from '../../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../../Utilities';
import type { IColor } from '../../../utilities/color/interfaces';

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
   * Label of the ColorRectangle for the benefit of screen reader users.
   * @defaultvalue 'Saturation and brightness'
   */
  ariaLabel?: string;

  /**
   * Format string for the color rectangle's current value as read by screen readers.
   * The string must include descriptions and two placeholders for the current values:
   * `{0}` for saturation and `{1}` for value/brightness.
   * @defaultvalue `'Saturation {0} brightness {1}'`
   */
  ariaValueFormat?: string;

  /**
   * Detailed description for how to use the color rectangle. Moving the thumb horizontally adjusts
   * saturation and moving it vertically adjusts value (essentially, brightness).
   * @defaultvalue 'Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.'
   */
  ariaDescription?: string;

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
  onChange?: (ev: React.MouseEvent | React.KeyboardEvent, color: IColor) => void;
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

  /**
   * Style for a hidden detailed description for screen reader users.
   */
  description?: IStyle;
}
