import { ITheme, IStyle } from '../../Styling';
import { IBaseProps, IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IColorPicker {}

export interface IColorPickerProps extends IBaseProps<IColorPicker> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IColorPicker>;

  /**
   * CSS-compatible string to describe the initial color.
   */
  color: string;

  /**
   * Callback issued when the user changes the color.
   */
  onColorChanged?: (color: string) => void;

  /**
   * The setting of whether to hide the alpha control slider.
   */
  alphaSliderHidden?: boolean;

  /**
   * Label for the hex textfield.
   * @default Hex
   */
  hexLabel?: string;

  /**
   * Label for the red textfield.
   * @default Red
   */
  redLabel?: string;

  /**
   * Label for the green textfield.
   * @default Green
   */
  greenLabel?: string;

  /**
   * Label for the blue textfield.
   * @default Blue
   */
  blueLabel?: string;

  /**
   * Label for the alpha textfield.
   * @default Alpha
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
}

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

export interface IColorPickerStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the panel element that contains the color rectangle.
   */
  panel?: IStyle;

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
}
