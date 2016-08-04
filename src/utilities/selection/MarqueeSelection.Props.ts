import * as React from 'react';
import { ISelection } from './interfaces';
import { MarqueeSelection } from './MarqueeSelection';

export interface IPoint {
  x: number;
  y: number;
}

export interface IRectangle {
  left: number;
  top: number;
  width: number;
  height: number;

  right?: number;
  bottom?: number;
}

export interface IMarqueeSelectionProps extends React.Props<MarqueeSelection> {
  baseElement?: string;
  className?: string;
  selection?: ISelection;
  onShouldStartSelection?: (ev: React.MouseEvent) => boolean;
}
