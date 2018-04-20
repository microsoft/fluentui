import * as React from 'react';
import { IStyle, IStyleSet } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerLine {

}

/**
 * ShimmerLine component props.
 */
export interface IShimmerLineProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerLine interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerLine | null) => void;

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
  borderStyle?: IStyleSet;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerLineStyleProps, IShimmerLineStyles>;
}

export interface IShimmerLineStyleProps {
  height?: number;
  widthInPercentage?: number;
  widthInPixel?: number;
  borderStyle?: IStyleSet;
}

export interface IShimmerLineStyles {
  root?: IStyle;
}