import * as React from 'react';
import {
  IStyle,
  IStyleSet
} from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerRectangle {

}

/**
 * ShimmerRectangle component props.
 */
export interface IShimmerRectangleProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerRectangle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerRectangle) => void;

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
  getStyles?: IStyleFunction<IShimmerRectangleStyleProps, IShimmerRectangleStyles>;
}

export interface IShimmerRectangleStyleProps {
  height?: number;
  verticalAlign?: string;
  widthInPercentage?: number;
  widthInPixel?: number;
  borderAlignStyle?: IStyleSet;
}

export interface IShimmerRectangleStyles {
  root?: IStyle;
}

export function getStyles(props: IShimmerRectangleStyleProps): IShimmerRectangleStyles {
  const {
    height,
    widthInPercentage,
    widthInPixel,
    borderAlignStyle
  } = props;

  const styles: IStyleSet = !!borderAlignStyle ? borderAlignStyle : {};
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '100%';

  return {
    root: [
      'ms-ShimmerRectangle-line',
      {
        color: 'transparent',
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
      },
      styles
    ]
  };
}
