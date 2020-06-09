import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IGrid {}

export interface IGridProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IGrid>;

  /**
   * Items to display in a grid with the specified number of columns
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
   * Whether focus should cycle back to the beginning once the user navigates past the end (and vice versa).
   * Only relevant if `doNotContainWithinFocusZone` is not true.
   */
  shouldFocusCircularNavigate?: boolean;

  /**
   * If false (the default), the grid is contained inside a FocusZone.
   * If true, a FocusZone is not used.
   * @default false
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * Class name for the FocusZone container for the grid.
   * @deprecated Use `styles.focusedContainer` to define styling for the focus zone container
   */
  containerClassName?: string;

  /**
   * Handler for when focus leaves the grid.
   */
  onBlur?: () => void;

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
   * Style for the FocusZone container for the grid.
   */
  focusedContainer?: IStyle;
}
