import * as React from 'react';
import {
  IStyle,
  IRawStyle,
  DefaultPalette
} from '../../../Styling';
import { IStyleFunction } from '../../../Utilities';

export interface IShimmerRectangle {

}

/**
 * ShimmerRectangle component props.
 */
export interface IShimmerRectangleProps extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IShimmerRectangle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmerRectangle) => void;

  /**
   * Sets the height of the rectangle.
   * @default 16px
   */
  height?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerRectangleStyleProps, IShimmerRectangleStyles>;
}

export interface IShimmerRectangleStyleProps {
  height?: string;
}

export interface IShimmerRectangleStyles {
  root?: IStyle;
}

export function getStyles(props: IShimmerRectangleStyleProps): IShimmerRectangleStyles {
  const {
    height
  } = props;

  return {
    root: [
      'ms-ShimmerRectangle-line',
      {
        color: 'transparent',
        width: '100%',
        height: height,
        boxSizing: 'border-box'
      },
    ]
  };
}
