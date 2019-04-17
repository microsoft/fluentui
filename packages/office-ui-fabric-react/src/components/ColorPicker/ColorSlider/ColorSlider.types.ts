import { ITheme, IStyle } from '../../../Styling';
import { IBaseProps, IRefObject, IStyleFunctionOrObject } from '../../../Utilities';

export interface IColorSlider {}

export interface IColorSliderProps extends IBaseProps<IColorSlider> {
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
   * Deprecated, use `onChange` instead.
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (newValue: number) => void;

  /**
   * If true, the slider represents an alpha slider.
   * Otherwise, the slider represents a hue slider.
   */
  isAlpha?: boolean;

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
