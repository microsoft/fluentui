import * as React from 'react';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IButtonGrid {}

export interface IButtonGridProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    React.RefAttributes<HTMLElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IButtonGrid>;

  /**
   * Items to display in a ButtonGrid with the specified number of columns
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
   * If false (the default), the ButtonGrid is contained inside a FocusZone.
   * If true, a FocusZone is not used.
   * @default false
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * Class name for the FocusZone container for the ButtonGrid.
   * @deprecated Use `styles.focusedContainer` to define styling for the focus zone container
   */
  containerClassName?: string;

  /**
   * Handler for when focus leaves the ButtonGrid.
   */
  onBlur?: () => void;

  /**
   * If true, uses radiogroup semantics for the ButtonGrid.
   * This should be set to true for single-row grids, for two reasons:
   *   1. Radios are a more simple and understandable control,
   *      and a better fit for a single-dimensional selection control
   *   2. Multiple browsers use heuristics to strip table and grid roles from single-row tables with no column headers.
   */
  isSemanticRadio?: boolean;

  /**
   * Position this ButtonGrid is in the parent set (index in a parent menu, for example)
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
  styles?: IStyleFunctionOrObject<IButtonGridStyleProps, IButtonGridStyles>;
}

/**
 * Properties required to build the styles for the ButtonGrid component.
 */
export interface IButtonGridStyleProps {
  /**
   * Theme to apply to the ButtonGrid
   */
  theme: ITheme;
}

/**
 * Styles for the ButtonGrid Component.
 */
export interface IButtonGridStyles {
  /**
   * Style for the table container of a ButtonGrid.
   */
  root: IStyle;

  /**
   * Style for the table cells of the ButtonGrid.
   */
  tableCell: IStyle;

  /**
   * Style for the FocusZone container for the ButtonGrid.
   */
  focusedContainer?: IStyle;
}
