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
   * Sets the width of the shimmer wave wrapper in percentages.
   * @default 100%
   */
  width?: number;

  /**
   * Controls when the shimmer is swapped with actual data through an animated transition.
   * @default false
   */
  isDataLoaded?: boolean;

  /**
   * Provide when Shimmer is intended to be used when using 'onRenderMissingItem' optional callback of the DetailsList Fabric Component.
   * @default false
   */
  isBaseStyle?: boolean;

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
   * The hight of the element in pixels (ICircle, ILine).
   * Read more details for each specific element.
   */
  height?: number;

  /**
   * The width of the element in pixels (ILine, IGap).
   * Read more details for each specific element.
   */
  widthInPixel?: number;

  /**
   * The width of the element in pixels (ILine, IGap).
   * Read more details for each specific element.
   */
  widthInPercentage?: number;

  /**
   * The vertical alignemt of the element (ICircle, ILine).
   * @default center
   */
  verticalAlign?: ShimmerElementVerticalAlign;
}

export interface ILine extends IShimmerElement {
  /**
   * Sets the height of the shimmer line in pixels.
   * @default 16px
   */
  height?: number;

  /**
   * The value provided will represent the width as '%' relative to the shimmer wrapper.
   */
  widthInPercentage?: number;

  /**
   * Sets the width of the Line to an exact value in pixels.
   * @default 50px
   */
  widthInPixel?: number;
}

export interface ICircle extends IShimmerElement {
  /**
   * Sets the height of the shimmer circle in pixels.
   * @default 24px
   */
  height?: number;
}

export interface IGap extends IShimmerElement {
  /**
   * The value will be calculated as '%' relative the to shimmer wrapper.
   */
  widthInPercentage?: number;

  /**
   * Sets the width of the Gap to an exact value in pixels.
   * @default 5px
   */
  widthInPixel?: number;
}

export interface IShimmerStyleProps {
  width?: number;
  maxHeight?: number;
  isDataLoaded?: boolean;
  isBaseStyle?: boolean;
}

export interface IShimmerStyles {
  root?: IStyle;
  shimmerWrapper?: IStyle;
  dataWrapper?: IStyle;
}

export const enum ShimmerElementType {
  LINE = 'line',
  CIRCLE = 'circle',
  GAP = 'gap'
}

export const enum ShimmerElementVerticalAlign {
  CENTER = 'center',
  BOTTOM = 'bottom',
  TOP = 'top'
}