import { IStyle, ITheme, IStyleFunction } from '../../Styling';

export interface IColorPickerGridCellProps {
  /**
   * Item to render
   */
  item: IColorCellProps;

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

  /**
   * The theme object to use for styling.
   */
  theme?: ITheme;

  /**
   * Wheter or not colorOption should be rendered as a circle or square.
   */
  circle?: boolean;

  /**
   * Optional, if the this option should be disabled
   */
  disabled?: boolean;

  /**
   * Optional, if the cell is currently selected
   */
  selected: boolean;

  /**
   * The on click handler
   */
  onClick?: (item: IColorCellProps) => void;

  /**
 * Optional, the onHover handler
 */
  onHover?: (item?: IColorCellProps) => void;

  /**
   * Optional, the onFocus handler
   */
  onFocus?: (item: IColorCellProps) => void;

  /**
  * Optional styles for the component.
  */
  getStyles?: IStyleFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
}

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
}

/**
 * Properties required to build the styles for the color picker component.
 */
export interface IColorPickerGridCellStyleProps {
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  circle?: boolean;
  isWhite?: boolean;
}

/**
 * Styles for the Color Picker Component.
 */
export interface IColorPickerGridCellStyles {
  /**
   * Style to apply to a colorCell in the color picker.
   */
  colorCell: IStyle;

  /**
   * Style to apply to the svg element that renders the color.
   */
  svg: IStyle;
}