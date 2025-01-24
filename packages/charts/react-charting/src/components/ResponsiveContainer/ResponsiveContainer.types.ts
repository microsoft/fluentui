import * as React from 'react';
import { IStyle } from '@fluentui/react/lib/Styling';

export interface IResponsiveContainerProps {
  /**
   *
   */
  width?: number | string;

  /**
   *
   */
  height?: number | string;

  /**
   *
   */
  onResize?: (width: number, height: number) => void;

  /**
   *
   */
  children: React.ReactElement<{ width?: number; height?: number }>;
}

export interface IResponsiveContainerStyles {
  /**
   *
   */
  root: IStyle;
}
