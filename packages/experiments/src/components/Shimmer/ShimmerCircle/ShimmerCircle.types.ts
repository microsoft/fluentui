import * as React from 'react';
import { IStyle, ITheme } from '../../../Styling';
import { IStyleFunctionOrObject, IRefObject } from '../../../Utilities';

export interface IShimmerCircle {}

/**
 * ShimmerCircle component props.
 */
export interface IShimmerCircleProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerCircle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IShimmerCircle>;

  /**
   * Sets the height of the circle.
   * @default 24px
   */
  height?: number;

  /**
   * Used to
   */
  borderStyle?: IStyle;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IShimmerCircleStyleProps, IShimmerCircleStyles>;
}

export interface IShimmerCircleStyleProps {
  height?: number;
  borderStyle?: IStyle;
  theme: ITheme;
}

export interface IShimmerCircleStyles {
  root?: IStyle;
  svg?: IStyle;
}
