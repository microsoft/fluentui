import * as React from 'react';
import { IStyle } from '@fluentui/react/lib/Styling';

export interface IResponsiveChildProps {
  width?: number;
  height?: number;
  shouldResize?: number;
}

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
  children: React.ReactElement<IResponsiveChildProps>;
}

export interface IResponsiveContainerStyles {
  root: IStyle;
}
