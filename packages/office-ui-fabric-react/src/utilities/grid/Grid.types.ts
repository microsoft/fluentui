import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IGrid {}

export interface IGridProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IGrid>;

  /**
   * The items to turn into a grid
   */
  items: any[];

  /**
   * The number of columns
   */
  columnCount: number;

  /**
   * Custom renderer for the individual items
   */
  onRenderItem: (item: any, index: number) => JSX.Element;

  /**
   * Boolean indicating if the focus should support circular navigation.
   * This prop is only relevant if doNotcontainWithinFocusZone is not true
   */
  shouldFocusCircularNavigate?: boolean;

  /**
   * If true do not contain the grid inside of a FocusZone.
   * If false contain the grid inside of a FocusZone.
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * Optional, class name for the FocusZone container for the grid
   * @deprecated Use `styles` and `IGridStyles` to define a styling for the focus zone container with
   * focusedContainer property.
   */
  containerClassName?: string;

  /**
   * Optional, handler for when the grid should blur
   */
  onBlur?: () => void;

  /**
   * The optional position this grid is in the parent set (index in a parent menu, for example)
   */
  positionInSet?: number;

  /**
   * The optional size of the parent set (size of parent menu, for example)
   */
  setSize?: number;

  /**
   * Theme to apply to the component.
   */
  theme?: ITheme;

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<IGridStyleProps, IGridStyles>;
}

/**
 * Properties required to build the styles for the grid component.
 */
export interface IGridStyleProps {
  /**
   * Theme to apply to the grid
   */
  theme: ITheme;
}

/**
 * Styles for the Grid Component.
 */
export interface IGridStyles {
  /**
   * Style for the table container of a grid.
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
