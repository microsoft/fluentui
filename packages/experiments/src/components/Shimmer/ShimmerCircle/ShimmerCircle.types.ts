import * as React from 'react';
import { IStyle, IStyleSet } from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerCircle {

}

/**
 * ShimmerCircle component props.
 */
export interface IShimmerCircleProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerCircle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerCircle | null) => void;

  /**
   * Sets the height of the circle.
   * @default 24px
   */
  height?: number;

  /**
   * Used to
   */
  borderStyle?: IStyleSet;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerCircleStyleProps, IShimmerCircleStyles>;
}

export interface IShimmerCircleStyleProps {
  height?: number;
  borderStyle?: IStyleSet;
}

export interface IShimmerCircleStyles {
  root?: IStyle;
  svg?: IStyle;
}