import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

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
   * Height of the cell, in pixels
   * @defaultvalue 20
   */
  height?: number;

  /**
   * Width of the cell, in pixels
   * @defaultvalue 20
   */
  width?: number;

  /**
   * Width of the border that indicates a selected/hovered cell, in pixels.
   * If `cellWidth` is less than 24px, then default value is 2px. Otherwise it defaults to 4px.
   * @defaultvalue 2
   */
  borderWidth?: number;

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
  styles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;

  /**
   * Optional, mouseEnter handler.
   * @returns true if the event should be processed, false otherwise
   */
  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  /**
   * Optional, mouseMove handler
   * @returns true if the event should be processed, false otherwise
   */
  onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  /**
   * Optional, mouseLeave handler
   */
  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional, onWheel handler
   */
  onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional, onkeydown handler
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
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
  /**
   * Theme to apply to the cell.
   */
  theme: ITheme;

  /**
   * Whether the component is disabled or not.
   */
  disabled?: boolean;

  /**
   * Whether the cell is currently selected or not.
   */
  selected?: boolean;

  /**
   * Whether the svg color element should be rendered as a circle or not.
   */
  circle?: boolean;

  /**
   * Whether the color being rendered is white or not. If it is white we show a border around it.
   */
  isWhite?: boolean;

  /**
   * The height of this cell, in pixels.
   */
  height?: number;

  /**
   * The width of this cell, in pixels.
   */
  width?: number;

  /**
   * The width of the border indicating a hovered or selected cell, in pixels.
   */
  borderWidth?: number;
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
