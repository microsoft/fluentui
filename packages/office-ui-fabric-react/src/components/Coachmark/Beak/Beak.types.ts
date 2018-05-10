import * as React from 'react';
import { Beak } from './Beak';

export interface IBeak { }

export enum BeakDirection {
  Top,
  Right,
  Bottom,
  Left
}

export interface IBeakProps extends React.Props<Beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IBeak | null) => void;

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
  direction?: BeakDirection;
}

export interface IBeakStylesProps {
  left?: string | undefined;
  top?: string | undefined;
  bottom?: string | undefined;
  right?: string | undefined;
  width?: string;
  height?: string;
  transform?: string;
}