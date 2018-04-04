import * as React from 'react';
import { Beak } from './Beak';

export interface IBeak { }

export interface IBeakProps extends React.Props<Beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IBeak | null) => void;

  /**
   * Beak width.
   * @default 18
   */
  width?: number;

  /**
   * Beak height.
   * @default 18
   */
  height?: number;

  /**
   * Color of the beak
   */
  color?: string;

  /**
   * Left position of the beak
   */
  left?: string | null;

  /**
   * Top position of the beak
   */
  top?: string | null;
}

export interface IBeakStylesProps {
  left?: string | null;
  top?: string | null;
  width?: string;
  height?: string;
}