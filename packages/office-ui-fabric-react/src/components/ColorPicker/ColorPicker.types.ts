import * as React from 'react';
import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IColor } from '../../utilities/color/interfaces';

/**
 * {@docCategory ColorPicker}
 */
export interface IColorPicker {
  /** The currently selected color. */
  color: IColor;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorPickerProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IColorPicker>;

  /**
   * Object or CSS-compatible string to describe the color.
   */
  color: IColor | string;

  /**
   * Labels for elements within the ColorPicker. Defaults are provided in English only.
   */
  strings?: IColorPickerStrings;

  /**
   * Callback for when the user changes the color.
   * (Not called when the color is changed via props.)
   */
  onChange?: (ev: React.SyntheticEvent<HTMLElement>, color: IColor) => void;

  /**
   * Whether to hide the alpha control slider.
   */
  alphaSliderHidden?: boolean;

  /**
   * Label for the hex text field.
   * @defaultvalue Hex
   * @deprecated Use `strings`
   */
  hexLabel?: string;

  /**
   * Label for the red text field.
   * @defaultvalue Red
   * @deprecated Use `strings`
   */
  redLabel?: string;

  /**
   * Label for the green text field.
   * @defaultvalue Green
   * @deprecated Use `strings`
   */
  greenLabel?: string;

  /**
   * Label for the blue text field.
   * @defaultvalue Blue
   * @deprecated Use `strings`
   */
  blueLabel?: string;

  /**
   * Label for the alpha textfield.
   * @defaultvalue Alpha
   * @deprecated Use `strings`
   */
  alphaLabel?: string;

  /**
   * Additional CSS class(es) to apply to the ColorPicker.
   */
  className?: string;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IColorPickerStyleProps, IColorPickerStyles>;

  /**
   * Whether to show color preview box.
   * @defaultvalue false
   */
  showPreview?: boolean;
}

export interface IColorPickerStrings {
  /**
   * Accessible label for the root of the color picker region.
   * The string should contain a placeholder `{0}` for the currently selected color.
   * @defaultvalue `'Color picker, {0} selected.'`
   */
  rootAriaLabelFormat?: string;

  /**
   * Label for the hex text field.
   * @defaultvalue Hex
   */
  hex?: string;

  /**
   * Label for the red text field.
   * @defaultvalue Red
   */
  red?: string;

  /**
   * Label for the green text field.
   * @defaultvalue Green
   */
  green?: string;

  /**
   * Label for the blue text field.
   * @defaultvalue Blue
   */
  blue?: string;

  /**
   * Label for the alpha text field and slider.
   * @defaultvalue Alpha
   */
  alpha?: string;

  /**
   * Aria label for the hue slider.
   * @defaultvalue Hue
   */
  hue?: string;

  /**
   * Aria label for the color rectangle, which adjusts saturation and value (brightness).
   * @defaultvalue 'Saturation and brightness'
   */
  svAriaLabel?: string;

  /**
   * Format string for the current values of the color rectangle.
   * The string must include descriptions and two placeholders for the current values:
   * `{0}` for saturation and `{1}` for value/brightness.
   * @defaultvalue `'Saturation {0} brightness {1}'`
   */
  svAriaValueFormat?: string;

  /**
   * Detailed description for how to use the color rectangle. Moving the thumb horizontally adjusts
   * saturation and moving it vertically adjusts value (essentially, brightness).
   * @defaultvalue 'Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.'
   */
  svAriaDescription?: string;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorPickerStyleProps {
  /**
   * Theme (provided through customization).
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the ColorPicker.
   */
  className?: string;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IColorPickerStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the panel element that contains the color rectangle, color sliders and inputs .
   */
  panel?: IStyle;

  /**
   * Style set for the panel element that contains the color rectangle
   */
  colorRectangle?: IStyle;

  /**
   * Style set for the table element that contains the color sliders and inputs.
   */
  table?: IStyle;

  /**
   * Style set for the table header that contains the labels.
   */
  tableHeader?: IStyle;

  /**
   * Style set for the table cell that contains the hex label.
   */
  tableHexCell?: IStyle;

  /**
   * Style set for each text field input.
   */
  input?: IStyle;

  /**
   * Color Square
   */
  colorSquare?: IStyle;

  /**
   * flexContainer
   */
  flexContainer?: IStyle;

  /**
   * flexSlider
   */
  flexSlider?: IStyle;

  /**
   * flexPreviewBox
   */
  flexPreviewBox?: IStyle;
}
