import * as React from 'react';

/**
 * Responsive Child styles
 * {@docCategory ResponsiveContainer}
 */
export interface ResponsiveChildStyles {
  root?: string;
  chartWrapper?: string;
  chart?: string;
}

/**
 * Responsive Child props
 * {@docCategory ResponsiveContainer}
 */
export interface ResponsiveChildProps {
  width?: number;
  height?: number;
  shouldResize?: number;
  styles?: ResponsiveChildStyles;
}

/**
 * Responsive Container props
 * {@docCategory ResponsiveContainer}
 */
export interface ResponsiveContainerProps {
  /**
   * Aspect ratio (width / height) of the container. If specified, the height will be calculated by width / aspect.
   */
  aspect?: number;

  /**
   * Width of the container
   */
  width?: number | string;

  /**
   * Height of the container
   */
  height?: number | string;

  /**
   * Minimum width of the container
   */
  minWidth?: number | string;

  /**
   * Minimum height of the container
   */
  minHeight?: number | string;

  /**
   * Maximum height of the container
   */
  maxHeight?: number;

  /**
   * Callback providing the updated chart width and height values when the container is resized
   */
  onResize?: (width: number, height: number) => void;

  /**
   * Child component to be rendered within the container
   */
  children: React.ReactElement<ResponsiveChildProps>;
}
