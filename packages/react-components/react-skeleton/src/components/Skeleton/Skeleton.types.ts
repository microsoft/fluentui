import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonSlots = {
  /**
   * The root slot of the `Skeleton` is the container that will contain the slots that make up a `Skeleton`
   * and any data that the `Skeleton` will load. The default html element is a `div`.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The wrapper slot of the Skeleton will contain the SkeletonElementsGroup and the SkeletonGradient.
   * The default html element is a div.
   */
  wrapper: NonNullable<Slot<'div'>>;
  /**
   * The slot that will show the Skeleton gradient on the page. The default html element is a div.
   */
  gradient: NonNullable<Slot<'div'>>;
  /**
   * The data slot will contain the data that will be rendered on the screen once it is loaded onto the page.
   * The default html element is div.
   */
  data: Slot<'div'>;
};

/**
 * Skeleton Props
 */
export type SkeletonProps = ComponentProps<SkeletonSlots> & {
  /**
   * Sets the width value of the skeleton wave wrapper.
   * @defaultvalue 100%
   */
  width?: number | string;

  /**
   * Controls when the skeleton is swapped with actual data through an animated transition.
   * @defaultvalue false
   */
  isDataLoaded?: boolean;

  /**
   * The background color to set for the Shimmer
   * @defaultvalue disabledBackground
   */
  color?: string;

  /**
   * Elements to render in one line of the Skeleton.
   */
  skeletonElements?: SkeletonElement[];

  /**
   * Custom elements when necessary to build complex placeholder skeletons.
   */
  customElementsGroup?: React.ReactNode;
};

/**
 * Skeleton Elements Interface representing all common properties between Circle and Line.
 * {@docCategory Skeleton}
 */
export interface SkeletonElement {
  /**
   * Represents the possible type of the skeleton elements: Circle or Line.
   * Required for every element you intend to use.
   */
  type: SkeletonElementType;

  /**
   * Sets the height of the element (Circle, Line) in pixels.
   * Read more details for each specific element.
   */
  height?: number;

  /**
   * Sets the width value of the element (Line) in pixels.
   * Read more details for each specific element.
   */
  width?: number | string;

  /**
   * Sets vertical alignment of the element (Circle, Line).
   * @defaultvalue center
   */
  verticalAlign?: 'top' | 'center' | 'bottom';
}

/**
 * Line element interface
 * {@docCategory Skeleton}
 */
export interface Line extends SkeletonElement {
  /**
   * Sets the height of the skeleton line in pixels.
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
 * {@docCategory Skeleton}
 */
export interface Circle extends SkeletonElement {
  /**
   * Sets the height of the skeleton circle in pixels.
   * Minimum supported 10px.
   * @defaultvalue 24px
   */
  height?: number;
}

/**
 * Describes the possible types for skeleton elements used.
 * {@docCategory Skeleton}
 */
export enum SkeletonElementType {
  /**
   * Line element type
   */
  line = 1,

  /**
   * Circle element type
   */
  circle = 2,
}

/**
 * Describes the default heights for skeleton elements when omitted in implementation.
 * {@docCategory Skeleton}
 */
export enum SkeletonElementsDefaultHeights {
  /**
   * Default height of the line element when not provided by user: 16px
   */
  line = 16,

  /**
   * Default height of the circle element when not provided by user: 24px
   */
  circle = 24,
}

/**
 * State used in rendering Skeleton
 */
export type SkeletonState = ComponentState<SkeletonSlots> &
  Required<Pick<SkeletonProps, 'isDataLoaded'>> &
  Pick<SkeletonProps, 'skeletonElements' | 'customElementsGroup' | 'color'>;
