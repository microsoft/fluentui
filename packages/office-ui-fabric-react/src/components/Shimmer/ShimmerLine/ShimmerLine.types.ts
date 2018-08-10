import * as React from 'react';
import { IStyle, IRawStyle, ITheme } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerLine { }

/**
 * ShimmerLine component props.
 */
export interface IShimmerLineProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerLine interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerLine | null) => void;

  /**
   * Sets the height of the rectangle.
   * @default 16px
   */
  height?: number;

  /**
   * Sets width value of the line.
   * @default 100%
   */
  width?: number | string;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerLineStyleProps, IShimmerLineStyles>;

  /**
   * Use to set custom styling of the shimmerLine borders.
   * @deprecated Use 'styles' prop to leverage mergeStyle API.
   */
  borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
 */
export type IShimmerLineStyleProps = {
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
export interface IShimmerLineStyles {
  /**
   * Root of the ShimmerLine component.
   */
  root?: IStyle;

  /**
   * Top-left corner SVG of the ShimmerLine component.
   */
  topLeftCorner?: IStyle;

  /**
   * Top-right corner SVG of the ShimmerLine component.
   */
  topRightCorner?: IStyle;

  /**
   * Bottom-right corner SVG of the ShimmerLine component.
   */
  bottomRightCorner?: IStyle;

  /**
   * Bottom-left corner SVG of the ShimmerLine component.
   */
  bottomLeftCorner?: IStyle;
}
