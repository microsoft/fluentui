import * as React from 'react';
import { IStyle, IRawStyle, ITheme } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerGap { }

/**
 * ShimmerGap component props.
 */
export interface IShimmerGapProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerGap interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerGap | null) => void;

  /**
   * Sets the height of the gap.
   * @default 16px
   */
  height?: number;

  /**
   * Sets width value of the gap.
   * @default 10px
   */
  width?: number | string;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerGapStyleProps, IShimmerGapStyles>;

  /**
   * Use to set custom styling of the shimmerGap borders.
   * @deprecated Use 'styles' prop to leverage mergeStyle API.
   */
  borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
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
   * @deprecated in favor of mergeStyles API.
   */
  borderStyle?: IRawStyle;
};

/**
 * Represents the stylable areas of the control.
 */
export interface IShimmerGapStyles {
  /**
   * Root of the ShimmerGap component.
   */
  root?: IStyle;
}
