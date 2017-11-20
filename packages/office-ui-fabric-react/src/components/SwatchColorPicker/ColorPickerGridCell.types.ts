import { IStyle, ITheme, IStyleFunction } from '../../Styling';

export interface IColorCellProps {

  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * The label for this item.
   * Visible text if this item is a header,
   * tooltip if is this item is normal
   */
  label?: string;

  /**
   * The CSS-compatible string to describe the color
   */
  color?: string;

  /**
   * Index for this option
   */
  index?: number;

  theme: ITheme;

  circle?: boolean;

  disabled?: boolean;

  isSelected: boolean;

  /**
  * Optional styles for the component.
  */
  getStyles?: IStyleFunction<IColorCellStyleProps, IColorCellStyles>;
}

/**
 * Properties required to build the styles for the color picker component.
 */
export interface IColorCellStyleProps {
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  isSelected?: boolean;
  circle?: boolean;
}

/**
 * Styles for the Color Picker Component.
 */
export interface IColorCellStyles {
  root: IStyle;
  svg: IStyle;
}