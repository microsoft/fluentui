import * as React from 'react';
import { IStyle, IStyleSet } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerGap {

}

/**
 * ShimmerGap component props.
 */
export interface IShimmerGapProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerGap interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerGap | null) => void;

  /**
   * Sets the height of the gap.
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
   * Sets custom styling of the gap.
   */
  borderStyle?: IStyleSet;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerGapStyleProps, IShimmerGapStyles>;
}

export interface IShimmerGapStyleProps {
  height?: number;
  widthInPercentage?: number;
  widthInPixel?: number;
  borderStyle?: IStyleSet;
}

export interface IShimmerGapStyles {
  root?: IStyle;
}