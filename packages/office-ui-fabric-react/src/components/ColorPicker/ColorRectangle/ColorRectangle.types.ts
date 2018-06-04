import { ITheme, IStyle } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';
import { IColor } from '../../../utilities/color/colors';

export interface IColorRectangle {

}

export interface IColorRectangleProps {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: IColorRectangle | null) => void;

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
   * Theme (provided through customization);
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IColorRectangleStyleProps, IColorRectangleStyles>;

  /**
   * Callback for when the color changes.
   */
  onSVChanged?(s: number, v: number): void;
}

export interface IColorRectangleStyleProps {
  theme: ITheme;
  className?: string;
}

export interface IColorRectangleStyles {
  root?: IStyle;
  light?: IStyle;
  dark?: IStyle;
  thumb?: IStyle;
}