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
 * Shimmer Elements Interface representing all common properties between Gap, Circle and Line.
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

/**
 * Line element interface
 */
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

/**
 * Circle element interface
 */
export interface ICircle extends IShimmerElement {
  /**
   * Sets the height of the shimmer circle in pixels.
   * Minimum supported 10px.
   * @defaultvalue 24px
   */
  height?: number;
}

/**
 * Gap element interface
 */
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

/**
 * Defines props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 */
export interface IShimmerStyleProps {
  /** Boolean flag to trigger fadeIn/fadeOut transition animation when content is loaded. */
  isDataLoaded?: boolean;

  /** Optional CSS class name for the component attached to the root stylable area. */
  className?: string;

  /** Theme provided by High-Order Component. */
  theme: ITheme;

  /** Interval in milliseconds for the adeIn/fadeOut transition animation. */
  transitionAnimationInterval?: number;

  /** Color to be used as the main background color of Shimmer when not animating. */
  shimmerColor?: string;

  /** Tip color of the shimmer wave which gradually gets from and to `shimmerColor`. */
  shimmerWaveColor?: string;
}

/**
 * Represents the stylable areas of the control.
 */
export interface IShimmerStyles {
  /** Refers to the root wrapper element. */
  root?: IStyle;

  /** Refers to wrapper element of the shimmer animation only. */
  shimmerWrapper?: IStyle;

  /** Refers to wrapper element of the children only. */
  dataWrapper?: IStyle;

  /** Styles for the hidden helper element to aid with screen readers. */
  screenReaderText?: IStyle;
}

/**
 * Describes the possible types for shimmer elements used.
 */
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

/**
 * Describes the default heights for shimmer elements when omitted in implementation.
 */
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
  shimmer?: string;

  /**
   * Defines the tip color of the shimmer wave which gradually gets from and to `shimmer` color.
   * @defaultvalue theme.palette.neutralLighter
   */
  shimmerWave?: string;

  /**
   * Defines the background color of the space in between and around shimmer elements (borders, gaps and rounded corners).
   * @defaultvalue theme.palette.white
   */
  background?: string;
}
