import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

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
   * Sets the width value of the shimmer wave wrapper.
   * @defaultvalue 100%
   */
  width?: number | string;

  /**
   * Controls when the shimmer is swapped with actual data through an animated transition.
   * @defaultvalue false
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
   * Defines an object with possible colors to pass for Shimmer customization used on different backgrounds.
   */
  shimmerColors?: IShimmerColors;
}

/**
 * Shimmer Elements Interface
 */
export interface IShimmerElement {
  /**
   * Represents the possible type of the shimmer elements: Gap, Circle, Line.
   * Required for every element you intend to use.
   */
  type: ShimmerElementType;

  /**
   * Sets the height of the element (ICircle, ILine, IGap) in pixels.
   * Read more details for each specific element.
   */
  height?: number;

  /**
   * Sets the width value of the element (ILine, IGap) in pixels.
   * Read more details for each specific element.
   */
  width?: number | string;

  /**
   * Sets vertical alignment of the element (ICircle, ILine).
   * @defaultvalue center
   */
  verticalAlign?: 'top' | 'center' | 'bottom';
}

export interface ILine extends IShimmerElement {
  /**
   * Sets the height of the shimmer line in pixels.
   * @defaultvalue 16px
   */
  height?: number;

  /**
   * Line width value.
   * @defaultvalue 100%
   */
  width?: number | string;
}

export interface ICircle extends IShimmerElement {
  /**
   * Sets the height of the shimmer circle in pixels.
   * Minimum supported 10px.
   * @defaultvalue 24px
   */
  height?: number;
}

export interface IGap extends IShimmerElement {
  /**
   * Sets the height of the shimmer gap in pixels.
   * @defaultvalue 16px
   */
  height?: number;

  /**
   * Gap width value.
   * @defaultvalue 10px
   */
  width?: number | string;
}

export interface IShimmerStyleProps {
  isDataLoaded?: boolean;
  className?: string;
  theme: ITheme;
  transitionAnimationInterval?: number;
  shimmerMainColor?: string;
  shimmerWaveColor?: string;
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
  gap = 3
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

/**
 * Interface describing the possible color customizations of Shimmer.
 */
export interface IShimmerColors {
  /**
   * Defines the main background color which is the color you see when the wave is not animating.
   * @defaultvalue theme.palette.neutralLight
   */
  shimmerMain?: string;

  /**
   * Defines the tip color of the shimmer wave which gradually gets from and to `shimmerMain` color.
   * @defaultvalue theme.palette.neutralLighter
   */
  shimmerWave?: string;

  /**
   * Defines the background color of the space in between and around shimmer elements (borders, gaps and rounded corners).
   * @defaultvalue theme.palette.white
   */
  surroundingSpace?: string;
}
