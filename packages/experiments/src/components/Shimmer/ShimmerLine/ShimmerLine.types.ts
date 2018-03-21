import * as React from 'react';
import {
  IStyle,
  IStyleSet
} from '../../../Styling';
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
  componentRef?: (component: IShimmerLine) => void;

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
   * @default center
   */
  verticalAlign?: string;

  /**
   * Sets custom styling of the rectangle.
   */
  borderAlignStyle?: IStyleSet;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerLineStyleProps, IShimmerLineStyles>;
}

export interface IShimmerLineStyleProps {
  height?: number;
  verticalAlign?: string;
  widthInPercentage?: number;
  widthInPixel?: number;
  borderAlignStyle?: IStyleSet;
}

export interface IShimmerLineStyles {
  root?: IStyle;
}