import * as React from 'react';
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
  width?: number;

  /**
   * Controls when the shimmer is swapped with actual data through an animated transition.
   * @default false
   */
  isDataLoaded?: boolean;

  /**
   * Elements to render in one line of the Shimmer.
   */
  lineElements?: Array<ICircle | IGap | ILine>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerStyleProps, IShimmerStyles>;
}

export interface IShimmerElement {
  /**
   * Required for every element you intend to use.
   */
  type: ShimmerElementType;

  /**
   * The hight of the element (ICircle, ILine, IGap).
   * Read more details for each specific element.
   */
  height?: number;

  /**
   * The width of the element (ICircle, ILine, IGap).
   * Read more details for each specific element.
   */
  width?: number;

  /**
   * The vertical alignemt of the element (ICircle, ILine, IGap).
   * @default center
   */
  verticalAlign?: ShimmerElementVerticalAlign;
}

export interface ILine extends IShimmerElement {
  /**
   * Sets the height of the rectangle.
   * The value will represent the height in pixels.
   * @default 16
   */
  height?: number;

  /**
   * If not provided the line will the take the remaining space to fill the shimmer container.
   * The value provided will represent the width as '%' relative to the shimmer container.
   */
  width?: number;
}

export interface ICircle extends IShimmerElement {
  /**
   * Sets the height of the circle.
   * The value will represent the height in pixels.
   * @default 24
   */
  height?: number;

  /**
   * Width of the circle element if provided will be ignored.
   * The value will be set equal to the height of the circle for scale ratio reasons.
   */
  width?: number;
}

export interface IGap extends IShimmerElement {
  /**
   * Height for gap element will be ignored and set equal to the heighest element on the line.
   */
  height?: number;

  /**
   * Sets the width relative to the shimmer container width for responsiveness reasons.
   * The value will be calculated as '%' relative the to shimmer container.
   * @default 1%
   */
  width?: number;
}

export interface IShimmerStyleProps {
  width?: number;
  maxHeight?: number;
  isDataLoaded?: boolean;
}

export interface IShimmerStyles {
  root?: IStyle;
  shimmerWrapper?: IStyle;
  dataWrapper?: IStyle;
}

export const enum ShimmerElementType {
  RECTANGLE = 'line',
  CIRCLE = 'circle',
  GAP = 'gap'
}

export const enum ShimmerElementVerticalAlign {
  CENTER = 'center',
  BOTTOM = 'bottom',
  TOP = 'top'
}