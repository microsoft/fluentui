import * as React from 'react';
import { IStyle, IRawStyle, ITheme } from '../../../Styling';
import { IStyleFunctionOrObject, IRefObject } from '../../../Utilities';

export interface IShimmerLine {}

/**
 * ShimmerLine component props.
 */
export interface IShimmerLineProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerLine interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmerLine>;

  /**
   * Sets the height of the rectangle.
   * @default 16px
   */
  height?: number;

  /**
   * Sets width value of the line.
   * @default 100%
   */
  width?: number | string;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerLineStyleProps, IShimmerLineStyles>;

  /**
   * Sets custom styling of the shimmerLine borders.
   * @deprecated Use styles prop to leverage mergeStyle API.
   */
  borderStyle?: IRawStyle;
}

export interface IShimmerLineStyleProps {
  height?: number;
  borderStyle?: IRawStyle;
  theme: ITheme;
}

export interface IShimmerLineStyles {
  root?: IStyle;
  topLeftCorner?: IStyle;
  topRightCorner?: IStyle;
  bottomRightCorner?: IStyle;
  bottomLeftCorner?: IStyle;
}
