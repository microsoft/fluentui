import * as React from 'react';
import { IStyle, ITheme } from '../../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../../Utilities';
import { IShimmerElement } from '../Shimmer.types';

/**
 * {@docCategory Shimmer}
 */
export interface IShimmerElementsGroup {}

/**
 * ShimmerElementsGroup component props.
 * {@docCategory Shimmer}
 */
export interface IShimmerElementsGroupProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerElementsGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmerElementsGroup>;

  /**
   * Optional maximum row height of the shimmerElements container.
   */
  rowHeight?: number;

  /**
   * Elements to render in one group of the Shimmer.
   */
  shimmerElements?: IShimmerElement[];

  /**
   * Optional boolean for enabling flexWrap of the container containing the shimmerElements.
   * @defaultvalue false
   */
  flexWrap?: boolean;

  /**
   * Optional width for ShimmerElements container.
   */
  width?: string;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Defines the background color of the space in between and around shimmer elements.
   * @defaultvalue theme.palette.white
   */
  backgroundColor?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export interface IShimmerElementsGroupStyleProps {
  /**
   * Boolean flag to notify whether the root element needs to flex wrap.
   */
  flexWrap?: boolean;

  /** Theme provided by High-Order Component. */
  theme: ITheme;
}

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export interface IShimmerElementsGroupStyles {
  /**
   * Represents the wrapper root element holding all elements inside.
   */
  root?: IStyle;
}
