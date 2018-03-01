import * as React from 'react';
import {
  IStyle,
  IRawStyle,
  DefaultPalette
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
   * If true, the component will render a circle as an icon placeholder
   * @default 24px
   */
  height?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerCircleStyleProps, IShimmerCircleStyles>;
}

export interface IShimmerCircleStyleProps {
  height?: string;
}

export interface IShimmerCircleStyles {
  root?: IStyle;
  svg?: IStyle;
}

export function getStyles(props: IShimmerCircleStyleProps): IShimmerCircleStyles {
  const {
    height
  } = props;

  return {
    root: [
      'ms-ShimmerCircle-wrapper',
      {
        width: height,
        height: height,
      },
    ],
    svg: [
      'ms-ShimmerCircle-svg',
      {
        fill: `${DefaultPalette.white}`
      }
    ]
  };
}
