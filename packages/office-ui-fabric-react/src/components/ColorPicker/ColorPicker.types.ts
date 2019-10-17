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

  // TODO: comment below was written pre-7--update if this is not the new behavior

  /**
   * Object or CSS-compatible string to describe the color.
   *
   * In Fabric 6, this component behaves as a hybrid of controlled and uncontrolled: when the user
   * makes a change, the displayed color also updates (like uncontrolled behavior), but any time props
   * are updated, the color from props will override the current color (like controlled behavior).
   * In v7, setting this property will give controlled behavior only: to register the user's changes,
   * the component consumer must provide an `onChange` handler and manually update the props.
   * To get uncontrolled behavior, use `defaultColor` (this already works as expected).
   */
  color?: IColor | string;
  // TODO: update behavior, and update documentation to say:
  // Object or CSS-compatible string to describe the current color. Only provide this if the
  // color picker is a controlled component; otherwise, use the `defaultColor` property.
  // You must also provide `onChange` if using this property.

  /**
   * Object or CSS-compatible string to describe the initial color. Only provide this if the
   * color picker is an uncontrolled component; otherwise, use the `color` property.
   * Updates to this property will be ignored.
   */
  defaultColor?: IColor | string;

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
