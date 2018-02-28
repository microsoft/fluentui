import * as React from 'react';
import { ShimmerBase } from './Shimmer.base';
import {
  IStyle
} from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IShimmer {

}

/**
 * Shimmer component props.
 */
export interface IShimmerProps extends React.HtmlHTMLAttributes<ShimmerBase> {
  /**
   * Optional callback to access the IShimmer interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmer) => void;

  /**
   * If true, the component will be a generic one.
   * @default false
   */
  isGeneric?: boolean;

  /**
   * If true, the component will render a circle as an icon placeholder
   * @default false
   */
  hasCircle?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IShimmerStyleProps, IShimmerStyles>;
}

export interface IShimmerStyleProps {
  isGeneric?: boolean;
  hasCircle?: boolean;
}

export interface IShimmerStyles {
  root?: IStyle;
  circle?: IStyle;
  line?: IStyle;
}