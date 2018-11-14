import * as React from 'react';
import { Beak } from './Beak';
import { RectangleEdge } from '../../../utilities/positioning';

export interface IBeak { }

export interface IBeakProps extends React.Props<Beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IBeak | null) => void;

  /**
   * Beak width.
   * @default 18
   * @deprecated
   */
  width?: number;

  /**
   * Beak height.
   * @default 18
   * @deprecated
   */
  height?: number;

  /**
   * Color of the beak
   */
  color?: string;

  /**
   * Left position of the beak
   */
  left?: string;

  /**
   * Top position of the beak
   */
  top?: string;

  /**
   * Right position of the beak
   */
  right?: string;

  /**
   * Bottom position of the beak
   */
  bottom?: string;

  /**
   * Direction of beak
   */
  direction?: RectangleEdge;
}

export interface IBeakStylesProps {
  left?: string | undefined;
  top?: string | undefined;
  bottom?: string | undefined;
  right?: string | undefined;
  width?: string;
  height?: string;
  transform?: string;
  color?: string;
}