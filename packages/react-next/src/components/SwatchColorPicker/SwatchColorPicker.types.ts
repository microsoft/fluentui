import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';
import {
  IColorCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles,
} from './ColorPickerGridCell.types';

/**
 * {@docCategory SwatchColorPicker}
 */
export interface ISwatchColorPickerProps {
  /**
   * Number of columns for the swatch color picker
   */
  columnCount: number;

  /**
   * ID for the swatch color picker's root element. Also used as a prefix for the IDs of color cells.
   */
  id?: string;

  /**
   * Additional class name to provide on the root element
   */
  className?: string;

  /**
   * The shape of the color cells.
   * @default 'circle'
   */
  cellShape?: 'circle' | 'square';

  /**
   * The ID of color cell that is currently selected
   */
  selectedId?: string;

  /**
   * The color cells that will be made available to the user.
   *
   * Note: When the reference to this prop changes, regardless of how many color cells change,
   * all of the color cells will be re-rendered (potentially bad perf) because we memoize
   * based on this prop's reference.
   */
  colorCells: IColorCellProps[];

  /**
   * Indicates whether the SwatchColorPicker is fully controlled.
   * When true, the component will not set its internal state to track the selected color.
   * Instead, the parent component will be responsible for handling state in the callbacks like
   * `onColorChanged`.
   *
   * NOTE: This property is a temporary workaround to force the component to be fully controllable
   * without breaking existing behavior
   */
  isControlled?: boolean;

  /**
   * Callback for when the user changes the color.
   * If `id` and `color` are unspecified, there is no selected cell.
   * (e.g. the user executed the currently selected cell to unselect it)
   */
  onColorChanged?: (id?: string, color?: string) => void;

  /**
   * Callback for when the user hovers over a color cell.
   * If `id` and `color` are unspecified, cells are no longer being hovered.
   */
  onCellHovered?: (id?: string, color?: string) => void;

  /**
   * Callback for when the user focuses a color cell.
   * If `id` and `color` are unspecified, cells are no longer being focused.
   */
  onCellFocused?: (id?: string, color?: string) => void;

  /**
   * Whether the control is disabled.
   */
  disabled?: boolean;

  /**
   * Position this grid is in the parent set (index in a parent menu, for example)
   */
  ariaPosInSet?: number;

  /**
   * @deprecated Use `ariaPosInSet`
   */
  positionInSet?: number;

  /**
   * Size of the parent set (size of parent menu, for example)
   */
  ariaSetSize?: number;

  /**
   * @deprecated Use `ariaSetSize`
   */
  setSize?: number;

  /**
   * Whether focus should cycle back to the beginning once the user navigates past the end (and vice versa).
   * Only relevant if `doNotContainWithinFocusZone` is not true.
   * @defaultvalue true
   */
  shouldFocusCircularNavigate?: boolean;

  /**
   * If false (the default), the grid is contained inside a FocusZone.
   * If true, a FocusZone is not used.
   * @default false
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
   * @defaultvalue If `cellWidth` is less than 24px, then default value is 2px. Otherwise it defaults to 4px.
   */
  cellBorderWidth?: number;

  /**
   * Theme to apply to the component.
   */
  theme?: ITheme;

  /**
   * Styles for the component.
   */
  styles?: IStyleFunctionOrObject<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>;

  /**
   * Styles for the grid cells.
   */
  getColorGridCellStyles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;

  /**
   * Whether to update focus when a cell is hovered.
   * @defaultvalue false
   */
  focusOnHover?: boolean;

  /**
   * Selector to focus on mouse leave. Should only be used in conjunction with `focusOnHover`.
   */
  mouseLeaveParentSelector?: string | undefined;
}

/**
 * Properties required to build the styles for the color picker component.
 * {@docCategory SwatchColorPicker}
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
 * {@docCategory SwatchColorPicker}
 */
export interface ISwatchColorPickerStyles {
  /**
   * Style applied to the container grid.
   */
  root: IStyle;

  /**
   * Style for the table cells of the grid.
   */
  tableCell: IStyle;

  /**
   * Style for the FocusZone container for the grid.
   */
  focusedContainer?: IStyle;
}
