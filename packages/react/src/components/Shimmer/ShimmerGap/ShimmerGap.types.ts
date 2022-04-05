import * as React from 'react';
import type { IStyle, IRawStyle, ITheme } from '../../../Styling';
import type { IStyleFunctionOrObject, IRefObject } from '../../../Utilities';

/**
 * {@docCategory Shimmer}
 */
export interface IShimmerGap {}

/**
 * ShimmerGap component props.
 * {@docCategory Shimmer}
 */
export interface IShimmerGapProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerGap interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmerGap>;

  /**
   * Sets the height of the gap.
   * @defaultvalue 16px
   */
  height?: number;

  /**
   * Sets width value of the gap.
   * @defaultvalue 10px
   */
  width?: number | string;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerGapStyleProps, IShimmerGapStyles>;

  /**
   * Use to set custom styling of the shimmerGap borders.
   * @deprecated Use `styles.root` instead.
   */
  borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export type IShimmerGapStyleProps = {
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
   * @deprecated Use `styles.root` instead.
   */
  borderStyle?: IRawStyle;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export interface IShimmerGapStyles {
  /**
   * Root of the ShimmerGap component.
   */
  root?: IStyle;
}
