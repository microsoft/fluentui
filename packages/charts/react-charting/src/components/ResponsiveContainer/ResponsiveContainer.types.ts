import * as React from 'react';
import { IStyle } from '@fluentui/react/lib/Styling';

/**
 * Responsive Child props
 * {@docCategory ResponsiveContainer}
 */
export interface IResponsiveChildProps {
  width?: number;
  height?: number;
  shouldResize?: number;
}

/**
 * Responsive Container props
 * {@docCategory ResponsiveContainer}
 */
export interface IResponsiveContainerProps {
  /**
   * Width of the container
   */
  width?: number | string;

  /**
   * Height of the container
   */
  height?: number | string;

  /**
   * Callback providing the updated chart width and height values when the container is resized
   */
  onResize?: (width: number, height: number) => void;

  /**
   * Child component to be rendered within the container
   */
  children: React.ReactElement<IResponsiveChildProps>;
}

export interface IResponsiveContainerStyles {
  root: IStyle;
}
