import * as React from 'react';
import { Beak } from './Beak';

export interface IBeak { }

export interface IBeakProps extends React.Props<Beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IBeak) => void;

  /**
   * Beak width.
   * @default 18
   */
  beakWidth?: number;

  /**
   * Beak height.
   * @default 18
   */
  beakHeight?: number;

  /**
   * Background color of the beak.
   */
  backgroundColor?: string;

  /**
   * If true then the beak is visible. If false it will not be shown.
   * @default true
   */
  isBeakVisible?: boolean;

  /**
   * A reference to the target the beak will align to.
   */
  target: HTMLElement;

  /**
   * The container the beak will be placed on.
   */
  targetBeakContainer: HTMLElement;
}
