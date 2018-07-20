import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject, IRefObject } from '../../Utilities';

export interface IShimmer {}

/**
 * Shimmer component props.
 */
export interface IShimmerProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmer interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmer>;

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
   * Elements to render in one line of the Shimmer.
   */
  shimmerElements?: IShimmerElement[];

  /**
   * Custom elements when necessary to build complex placeholder skeletons.
   */
  customElementsGroup?: React.ReactNode;

  /**
   * Localized string of the status label for screen reader
   */
  ariaLabel?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerStyleProps, IShimmerStyles>;

  /**
   * Additional CSS class(es) to apply to the Shimmer container.
   */
  className?: string;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Elements to render in one line of the Shimmer.
   * Deprecated, use 'shimmerElements' for better semantic meaning.
   * @deprecated Use 'shimmerElements' instead.
   */
  lineElements?: IShimmerElement[];

  /**
   * Sets the width of the shimmer wave wrapper in percentages.
   * Deprecated, use a more specific width like 'widthInPixel' or 'widthInPercentage'.
   * @default 100%
   * @deprecated Use a more specific width like 'widthInPixel' or 'widthInPercentage'.
   */
  width?: number;

  /**
   * Use when providing custom skeleton as children wrapped by shimmer.
   * Deprecated in favor of 'customElementsGroup'
   * @default false
   * @deprecated Use 'customElementsGroup' instead.
   */
  isBaseStyle?: boolean;
}

/**
 * Shimmer Elements Interface
 */
export interface IShimmerElement {
  /**
   * Required for every element you intend to use.
   */
  type: ShimmerElementType;

  /**
   * The height of the element (ICircle, ILine, IGap) in pixels.
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
  widthInPercentage?: number;
  widthInPixel?: number;
  isDataLoaded?: boolean;
  className?: string;
  theme: ITheme;
  transitionAnimationInterval?: number;
}

export interface IShimmerStyles {
  root?: IStyle;
  shimmerWrapper?: IStyle;
  dataWrapper?: IStyle;
  screenReaderText?: IStyle;
}

export enum ShimmerElementType {
  /**
   * Line element type
   */
  line = 1,

  /**
   * Circle element type
   */
  circle = 2,

  /**
   * Gap element type
   */
  gap = 3,

  /**
   * @deprecated Use 'line' instead
   */
  LINE = 1,

  /**
   * @deprecated Use 'circle' instead
   */
  CIRCLE = 2,

  /**
   * @deprecated Use 'gap' instead
   */
  GAP = 3
}

export enum ShimmerElementVerticalAlign {
  /**
   * @deprecated Use 'center' instead
   */
  CENTER = 1,

  /**
   * @deprecated Use 'bottom' instead
   */
  BOTTOM = 2,

  /**
   * @deprecated Use 'top' instead
   */
  TOP = 3,

  /**
   * Positions the element vertically in center
   */
  center = 1,

  /**
   * Positions the element vertically at the bottom
   */
  bottom = 2,

  /**
   * Positions the element vertically at the top
   */
  top = 3
}

export enum ShimmerElementsDefaultHeights {
  /**
   * Default height of the line element when not provided by user: 16px
   */
  line = 16,

  /**
   * Default height of the gap element when not provided by user: 16px
   */
  gap = 16,

  /**
   * Default height of the circle element when not provided by user: 24px
   */
  circle = 24
}
