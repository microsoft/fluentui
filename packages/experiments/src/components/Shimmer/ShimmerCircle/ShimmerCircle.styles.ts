import * as React from 'react';
import {
  IStyle,
  DefaultPalette,
  IStyleSet
} from '../../../Styling';
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
  componentRef?: (component: IShimmerCircle) => void;

  /**
   * Sets the height of the circle.
   * @default 24px
   */
  height?: number;

  /**
   * Used to
   */
  borderAlignStyle?: IStyleSet;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerCircleStyleProps, IShimmerCircleStyles>;
}

export interface IShimmerCircleStyleProps {
  height?: number;
  borderAlignStyle?: IStyleSet;
}

export interface IShimmerCircleStyles {
  root?: IStyle;
  svg?: IStyle;
}

export function getStyles(props: IShimmerCircleStyleProps): IShimmerCircleStyles {
  const {
    height,
    borderAlignStyle
  } = props;

  const styles: IStyleSet = !!borderAlignStyle ? borderAlignStyle : {};

  return {
    root: [
      'ms-ShimmerCircle-wrapper',
      {
        width: `${height}px`,
        height: `${height}px`,
      },
      styles
    ],
    svg: [
      'ms-ShimmerCircle-svg',
      {
        fill: `${DefaultPalette.white}`
      }
    ]
  };
}
