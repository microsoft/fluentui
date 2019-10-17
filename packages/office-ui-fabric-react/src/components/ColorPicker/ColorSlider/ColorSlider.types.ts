import * as React from 'react';
import { ITheme, IStyle } from '../../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../../Utilities';

/**
 * {@docCategory ColorPicker}
 */
export interface IColorSlider {
  /** Gets the current value of the color slider. */
  value: number;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorSliderProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IColorSlider>;

  /**
   * Minimum value of the slider.
   */
  minValue?: number;

  /**
   * Maximum value of the slider.
   */
  maxValue?: number;

  /**
   * Current value of the slider. Only provide this if the slider is a controlled component where you
   * are maintaining its current state; otherwise, use the `defaultValue` property.
   */
  value?: number;

  /**
   * Default value of the slider. Only provide this if the slider is an uncontrolled component;
   * otherwise, use the `value` property. Updates to this property will be ignored.
   */
  defaultValue?: number;

  /**
   * If true, the slider represents an alpha slider and will display a gray checkered pattern
   * in the background. Otherwise, the slider represents a hue slider.
   * @defaultvalue false
   */
  isAlpha?: boolean;

  /**
   * CSS-compatible string for the color of the thumb element.
   */
  thumbColor?: string;

  /**
   * Custom style for the overlay element.
   */
  overlayStyle?: any;

  /**
   * Callback issued when the value changes.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, newValue?: number) => void;

  /**
   * Additional CSS class(es) to apply to the ColorSlider.
   */
  className?: string;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IColorSliderStyleProps, IColorSliderStyles>;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorSliderStyleProps {
  /**
   * Theme (provided through customization).
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the ColorSlider.
   */
  className?: string;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorSliderStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the draggable thumb element.
   */
  sliderThumb?: IStyle;

  /**
   * Style set for the overlay element.
   */
  sliderOverlay?: IStyle;
}
