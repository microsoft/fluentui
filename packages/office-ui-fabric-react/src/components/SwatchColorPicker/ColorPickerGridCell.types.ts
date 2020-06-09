import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory SwatchColorPicker}
 */
export interface IColorPickerGridCellProps {
  /**
   * Item to render
   */
  item: IColorCellProps;

  /**
   * Used as a PREFIX for the cell's ID (the cell will not have this literal string as its ID).
   * @deprecated Deprecated due to misleading name. Use `idPrefix` instead.
   */
  id?: string;

  /**
   * Prefix for this cell's ID. Will be required in a future version once `id` is removed.
   */
  idPrefix?: string;

  /**
   * Tooltip and aria label for this item
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
   * True if this cell should be rendered as a circle, false if it should be a square.
   * @default `true` (render as circle)
   */
  circle?: boolean;

  /**
   * Whether this cell should be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether this cell is currently selected
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
   * @defaultvalue 2 if `cellWidth` is less than 24; otherwise 4
   */
  borderWidth?: number;

  /**
   * Handler for when a color cell is clicked.
   */
  onClick?: (item: IColorCellProps) => void;

  onHover?: (item?: IColorCellProps) => void;

  onFocus?: (item: IColorCellProps) => void;

  /**
   * Custom styles for the component.
   */
  styles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;

  /**
   * Mouse enter handler. Returns true if the event should be processed, false otherwise.
   */
  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  /**
   * Mouse move handler. Returns true if the event should be processed, false otherwise.
   */
  onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * {@docCategory SwatchColorPicker}
 */
export interface IColorCellProps {
  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * Tooltip and aria label for this item
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
 * {@docCategory SwatchColorPicker}
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
 * {@docCategory SwatchColorPicker}
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
