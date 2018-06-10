import * as React from 'react';
import { IStyle } from '../../Styling';
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
  componentRef?: (component: IShimmer | null) => void;

  /**
   * Sets the width of the shimmer wave wrapper in percentages.
   * Deprecated, use a more specific width like widthInPixel or widthInPercentage.
   * @default 100%
   * @deprecated
   */
  width?: number;

  /**
   * Sets the width of the shimmer wave wrapper in percentages relative to the containig parent element.
   * @default 100%
   */
  widthInPercentage?: number;

  /**
   * Sets the width of the shimmer wave wrapper to an exact value in pixels.
   * If none of the widths provided, it defaults to 100%.
   */
  widthInPixel?: number;

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
   * The height of the element (ICircle, ILine) in pixels.
   * Read more details for each specific element.
   */
  height?: number;

  /**
   * The width of the element (ILine, IGap) in pixels.
   * Read more details for each specific element.
   */
  widthInPixel?: number;

  /**
   * The width of the element (ILine, IGap) in pixels.
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
   * The value provided will represent the width as '%' relative to shimmer wrapper.
   * @default 100%
   */
  widthInPercentage?: number;

  /**
   * Sets the width of the Line to an exact value in pixels.
   * If none of the widths provided, it defaults to 100%.
   */
  widthInPixel?: number;
}

export interface ICircle extends IShimmerElement {
  /**
   * Sets the height of the shimmer circle in pixels.
   * Minimum supported 10px.
   * @default 24px
   */
  height?: number;
}

export interface IGap extends IShimmerElement {
  /**
   * Sets the height of the shimmer gap in pixels.
   * @default 16px
   */
  height?: number;
  /**
   * The value provided will represent the width as '%' relative to shimmer wrapper.
   * If none of the widths provided, it defaults to 10px.
   */
  widthInPercentage?: number;

  /**
   * Sets the width of the Gap to an exact value in pixels.
   * @default 10px
   */
  widthInPixel?: number;
}

export interface IShimmerStyleProps {
  width?: number;
  rowHeight?: number;
  widthInPercentage?: number;
  widthInPixel?: number;
  isDataLoaded?: boolean;
  isBaseStyle?: boolean;
}

export interface IShimmerStyles {
  root?: IStyle;
  shimmerWrapper?: IStyle;
  dataWrapper?: IStyle;
}

/**
 * The CAPS lock values will be deprecated soon.
 * @deprecated
 */
export const enum ShimmerElementType {
  LINE = 'line',
  CIRCLE = 'circle',
  GAP = 'gap',
  line = 'line',
  circle = 'circle',
  gap = 'gap'
}

/**
 * The CAPS lock values will be deprecated soon.
 * @deprecated
 */
export const enum ShimmerElementVerticalAlign {
  CENTER = 'center',
  BOTTOM = 'bottom',
  TOP = 'top',
  center = 'center',
  bottom = 'bottom',
  top = 'top'
}