import * as React from 'react';
import { ShimmerBase } from './Shimmer.base';
import {
  IStyle
} from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IShimmer {

}

/**
 * Shimmer component props.
 */
export interface IShimmerProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmer interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmer) => void;

  /**
   * Sets the width of the shimmer wave container in percentages.
   * @default 100%
   */
  width: string;

  /**
   * Elements of the line to shimmer.
   */
  lineElements?: Array<IShimmerCirc | IShimmerGap | IShimmerRect>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerStyleProps, IShimmerStyles>;
}

export interface IShimmerElement {
  /**
   * Required for every element you intend to use.
   */
  type: string;

  /**
   * The hight of the element (Circle, Rectangle, Gap).
   * Think pixels.
   * Example: height='16'
   */
  height?: string;

  /**
   * The width of the element (Circle, Rectangle, Gap)
   * Think percentages.
   * Example: width='20'
   */
  width?: string;

  /**
   * The vertical alignemt of the element (Circle, Rectangle, Gap)
   * Options: center, top, bottom
   * @default center
   */
  verticalAlign?: 'center' | 'top' | 'bottom';
}

export interface IShimmerRect extends IShimmerElement {
  /**
   * @default 16px
   */
  height?: string;
  /**
   * If not provided all rectangles will be the of the same size.
   */
  width?: string;
}

export interface IShimmerCirc extends IShimmerElement {
  /**
   * Width for circle element will be ignored. Do not provide!
   */
  width?: string;
}

export interface IShimmerGap extends IShimmerElement {
  /**
   * Height for gap element will be ignored and set to the maximum height of the line.
   */
  height?: string;
  /**
   * The width will be percentage based relatively to the whole Shimmer width for responsiveness reasons.
   * Example: width='5'
   */
  width: string;
}

export interface IShimmerStyleProps {
  width?: string;
}

export interface IShimmerStyles {
  root?: IStyle;
}

export const enum ShimmerElementType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  GAP = 'gap'
}