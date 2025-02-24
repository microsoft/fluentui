import * as React from 'react';

export interface ResponsiveContainerProps {
  children: React.ReactElement;
  onResize?: (width: number, height: number) => void;
  width?: number | string;
  height?: number | string;
}

export interface ResponsiveContainerStyles {
  root: string;
}
