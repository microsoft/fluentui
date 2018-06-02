import { ITheme, IStyle } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IColorSlider {

}

export interface IColorSliderProps {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: IColorSlider | null) => void;

  minValue?: number;
  maxValue?: number;
  value?: number;
  thumbColor?: string;
  overlayStyle?: any;
  onChanged?: (newValue: number) => void;
  isAlpha?: boolean;

  /**
   * Additional CSS class(es) to apply to the ColorSlider.
   */
  className?: string;

  /**
   * Theme (provided through customization);
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IColorSliderStyleProps, IColorSliderStyles>;
}

export interface IColorSliderStyleProps {
  theme: ITheme;
  className?: string;
}

export interface IColorSliderStyles {
  root?: IStyle;
  sliderThumb?: IStyle;
  sliderOverlay?: IStyle;
}