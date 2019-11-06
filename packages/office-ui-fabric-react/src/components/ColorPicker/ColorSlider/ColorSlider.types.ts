import * as React from 'react';
import { ITheme, IStyle } from '../../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../../Utilities';

/**
 * {@docCategory ColorPicker}
 */
export interface IColorSlider {
  /** Current value of the slider. */
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
   * Current value of the slider.
   */
  value?: number;

  /**
   * Label of the ColorSlider for the benefit of screen reader users.
   */
  ariaLabel?: string;

  /**
   * If true, the slider represents an alpha slider and will display a gray checkered pattern
   * in the background. Otherwise, the slider represents a hue slider.
   * @defaultvalue false
   */
  isAlpha?: boolean;

  /**
   * Hex color to use when rendering an alpha slider's overlay.
   */
  overlayColor?: string;

  /**
   * CSS-compatible string for the color of the thumb element.
   * @deprecated Not used. Use `styles.sliderThumb` instead.
   */
  thumbColor?: string;

  /**
   * Custom style for the overlay element.
   * @deprecated Use `overlayColor` instead
   */
  overlayStyle?: React.CSSProperties;

  /**
   * Callback issued when the value changes.
   */
  onChange?: (event: React.MouseEvent | React.KeyboardEvent, newValue?: number) => void;

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
export type IColorSliderStyleProps = Required<Pick<IColorSliderProps, 'theme'>> & Pick<IColorSliderProps, 'className' | 'isAlpha'>;

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
