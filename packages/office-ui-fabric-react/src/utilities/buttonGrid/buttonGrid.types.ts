import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IButtonGrid {}

export interface IButtonGridProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IButtonGrid>;

  /**
   * Items to display in a buttonGrid with the specified number of columns.
   */
  items: any[];

  /**
   * The number of columns.
   */
  columnCount: number;

  /**
   * Custom renderer for the individual items.
   */
  onRenderItem: (item: any, index: number) => JSX.Element;

  /**
   * Whether focus should cycle back to the beginning once the user navigates past the end (and vice versa).
   * Only relevant if `doNotContainWithinFocusZone` is not true.
   */
  shouldFocusCircularNavigate?: boolean;

  /**
   * If false (the default), the buttonGrid is contained inside a FocusZone.
   * If true, a FocusZone is not used.
   * @default false
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * Class name for the FocusZone container for the buttonGrid.
   * @deprecated Use `styles.focusedContainer` to define styling for the focus zone container
   */
  containerClassName?: string;

  /**
   * Handler for when focus leaves the buttonGrid.
   */
  onBlur?: () => void;

  /**
   * Position this buttonGrid is in the parent set (index in a parent menu, for example)
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
 * Properties required to build the styles for the buttonGrid component.
 */
export interface IButtonGridStyleProps {
  /**
   * Theme to apply to the buttonGrid.
   */
  theme: ITheme;
}

/**
 * Styles for the buttonGrid Component.
 */
export interface IButtonGridStyles {
  /**
   * Style for the table container of a buttonGrid.
   */
  root: IStyle;

  /**
   * Style for the table cells of the buttonGrid.
   */
  tableCell: IStyle;

  /**
   * Style for the FocusZone container for the buttonGrid.
   */
  focusedContainer?: IStyle;
}

/**
 * @deprecated - use IButtonGrid instead.
 */
export interface IGrid extends IButtonGrid {}

/**
 * @deprecated - use ISwIButtonGridPropsatchGridProps instead.
 */
export interface IGridProps extends IButtonGridProps {}

/**
 * @deprecated - use IButtonGridStyleProps instead.
 */
export interface IGridStyleProps extends IButtonGridStyleProps {}

/**
 * @deprecated - use IButtonGridStyles instead.
 */
export interface IGridStyles extends IButtonGridStyles {}
