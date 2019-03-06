import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IColorCellProps, IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';

export interface ISwatchColorPicker {}

export interface ISwatchColorPickerProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<ISwatchColorPicker>;

  /**
   * the number of columns for the swatch color picker
   */
  columnCount: number;

  /**
   * The id for the swatch color picker
   */
  id?: string;

  /**
   * Additional class name to provide on the root element
   */
  className?: string;

  /**
   * The shape of the color cells, defaults to circle
   */
  cellShape?: 'circle' | 'square';

  /**
   * The id of color cell that is currently selected
   */
  selectedId?: string;

  /**
   * The color cells that will be made available to the user
   */
  colorCells: IColorCellProps[];

  /**
   * Callback issued when the user changes the color.
   * Note, if no id or color is given, there is no selected cell
   * (e.g. the user executed the currently selected cell to unselect it)
   */
  onColorChanged?: (id?: string, color?: string) => void;

  /**
   * Callback issued when the user hovers over a color cell.
   * Note, if no id or color is given, cells are not longer being hovered
   */
  onCellHovered?: (id?: string, color?: string) => void;

  /**
   * Callback issued when the user focuses a color cell.
   * Note, if no id or color is given, cells are not longer being focused
   */
  onCellFocused?: (id?: string, color?: string) => void;

  /**
   * Is this swatch color picker disabled?
   */
  disabled?: boolean;

  /**
   * The optional position this grid is in the parent set (index in a parent menu, for example)
   */
  positionInSet?: number;

  /**
   * The optional size of the parent set (size of parent menu, for example)
   */
  setSize?: number;

  /**
   * Should focus cycle to the beginning of once the user navigates past the end (and vice versa).
   * This prop is only relevant if doNotcontainWithinFocusZone is not true
   * @defaultvalue true
   */
  shouldFocusCircularNavigate?: boolean;

  /**
   * If true do not contain the grid inside of a FocusZone.
   * If false contain the grid inside of a FocusZone.
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * The distance between cells, in pixels
   * @defaultvalue 10
   */
  cellMargin?: number;

  /**
   * Height of an individual cell, in pixels
   * @defaultvalue 20
   */
  cellHeight?: number;

  /**
   * Width of an individual cell, in pixels
   * @defaultvalue 20
   */
  cellWidth?: number;

  /**
   * Width of the border indicating a hovered/selected cell, in pixels
   * If `cellWidth` is less than 24px, then default value is 2px. Otherwise it defaults to 4px.
   * @defaultvalue 2
   */
  cellBorderWidth?: number;

  /**
   * Theme to apply to the component.
   */
  theme?: ITheme;

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>;

  /**
   * Optional styles for the component.
   */
  getColorGridCellStyles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;

  /**
   * Optional, whether to update focus when a cell is hovered.
   * @defaultvalue false
   */
  focusOnHover?: boolean;

  /**
   * Selector to focus on mouseLeave
   * SHOULD ONLY BE USED IN CONJUNCTION WITH focusOnHover
   */
  mouseLeaveParentSelector?: string | undefined;
}

/**
 * Properties required to build the styles for the color picker component.
 */
export interface ISwatchColorPickerStyleProps {
  /**
   * Theme to apply to the container
   */
  theme: ITheme;

  /**
   * Custom className to apply to the container.
   */
  className?: string;

  /**
   * The distance between cells
   */
  cellMargin?: number;
}

/**
 * Styles for the Color Picker Component.
 */
export interface ISwatchColorPickerStyles {
  /**
   * Style applied to the container grid of the swatchColorPicker
   */
  root: IStyle;

  /**
   * Style for the table cells of the grid.
   */
  tableCell: IStyle;

  /**
   * Optional, style for the FocusZone container for the grid
   */
  focusedContainer?: IStyle;
}
