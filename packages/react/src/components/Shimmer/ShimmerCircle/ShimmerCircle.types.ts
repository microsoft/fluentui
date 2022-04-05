import * as React from 'react';
import type { IStyle, ITheme, IRawStyle } from '../../../Styling';
import type { IStyleFunctionOrObject, IRefObject } from '../../../Utilities';

/**
 * {@docCategory Shimmer}
 */
export interface IShimmerCircle {}

/**
 * ShimmerCircle component props.
 * {@docCategory Shimmer}
 */
export interface IShimmerCircleProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerCircle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmerCircle>;

  /**
   * Sets the height of the circle.
   * @defaultvalue 24px
   */
  height?: number;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerCircleStyleProps, IShimmerCircleStyles>;

  /**
   * Use to set custom styling of the shimmerCircle borders.
   * @deprecated Use `styles.root` instead.
   */
  borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export type IShimmerCircleStyleProps = {
  /**
   * Theme values passed to the component.
   */
  theme: ITheme;

  /**
   * Needed to provide a height to the root of the control.
   */
  height?: number;

  /**
   * Styles to override borderStyles with custom ones.
   * @deprecated Deprecated in favor of mergeStyles API.
   */
  borderStyle?: IRawStyle;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export interface IShimmerCircleStyles {
  /**
   * Root of the ShimmerCircle component.
   */
  root?: IStyle;

  /**
   * Style for the circle SVG of the ShimmerCircle component.
   */
  svg?: IStyle;
}
