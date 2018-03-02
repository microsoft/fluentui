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

export interface IShimmerStyleProps {
  width?: string;
}

export interface IShimmerStyles {
  root?: IStyle;
}

export interface IShimmerElemType {
  type: string;
}

export interface IShimmerRect extends IShimmerElemType {
  /**
   * Needs to be provided in pixels.
   * Example: height='16px'
   */
  height?: string;

  /**
   * Vertical align of the element = ? center | top | bottom
   * @default center
   */
  verticalAlign?: string;
}

export interface IShimmerCirc extends IShimmerElemType {
  /**
   * Needs to be provided in pixels.
   * Example: diameter='24px'
   */
  diameter?: string;

  /**
   * Vertical align of the element = ? center | top | bottom
   * @default center
   */
  verticalAlign?: string;
}

export interface IShimmerGap extends IShimmerElemType {
  /**
   * Needs to be provided in percentages relatively to the whole Shimmer width.
   * Example: width='5%'
   */
  width?: string;
}

export const enum ShimmerElementType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  GAP = 'gap'
}