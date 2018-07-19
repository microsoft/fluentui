import * as React from 'react';
import { IStyle, ITheme } from '../../../Styling';
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
   * Sets width of the element in percentages.
   * @default 100%
   */
  widthInPercentage?: number;

  /**
   * Sets width of the element in pixels.
   * @default 50px
   */
  widthInPixel?: number;

  /**
   * Sets custom styling of the rectangle.
   */
  borderStyle?: IStyle;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerLineStyleProps, IShimmerLineStyles>;
}

export interface IShimmerLineStyleProps {
  height?: number;
  widthInPercentage?: number;
  widthInPixel?: number;
  borderStyle?: IStyle;
  theme: ITheme;
}

export interface IShimmerLineStyles {
  root?: IStyle;
  topLeftCorner?: IStyle;
  topRightCorner?: IStyle;
  bottomRightCorner?: IStyle;
  bottomLeftCorner?: IStyle;
}
