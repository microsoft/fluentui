import * as React from 'react';
import { Shimmer } from './Shimmer';

export interface IShimmer {

}

export interface IShimmerProps extends React.HtmlHTMLAttributes<Shimmer> {
  /**
   * Optional callback to access the IShimmer interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IShimmer) => void;

  /**
   * If true, the component will be a generic one
   * @default false
   */
  isGeneric?: boolean;
}