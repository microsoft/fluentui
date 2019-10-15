import * as React from 'react';
import { IStyle, ITheme } from '../../../Styling';
import { IStyleFunctionOrObject, IRefObject } from '../../../Utilities';
import { IShimmerElement } from '../Shimmer.types';

export interface IShimmerElementsGroup {}

/**
 * ShimmerElementsGroup component props.
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
   * @default false
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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>;
}

export interface IShimmerElementsGroupStyleProps {
  flexWrap?: boolean;
  width?: string;
  theme: ITheme;
}

export interface IShimmerElementsGroupStyles {
  root?: IStyle;
}
