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
   */
  hexLabel?: string;

  /**
   * Label for the red text field.
   * @defaultvalue Red
   */
  redLabel?: string;

  /**
   * Label for the green text field.
   * @defaultvalue Green
   */
  greenLabel?: string;

  /**
   * Label for the blue text field.
   * @defaultvalue Blue
   */
  blueLabel?: string;

  /**
   * Label for the alpha textfield.
   * @defaultvalue Alpha
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
