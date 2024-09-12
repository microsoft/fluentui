import * as React from 'react';

export interface ResponsiveContainerProps {
  children: (props: { containerWidth?: number; containerHeight?: number }) => React.ReactNode;
  onResize?: (width: number, height: number) => void;
}

export interface ResponsiveContainerStyles {
  root: string;
}
