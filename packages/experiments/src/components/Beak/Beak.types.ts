import * as React from 'react';
import { Beak } from './Beak';
import {
  IPoint
} from '../../Utilities';

export interface IBeak { }

export interface IBeakProps extends React.Props<Beak> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IBeak) => void;

  /**
   * Beak Width
   */
  beakWidth?: number;

  /**
   * Background color of the beak
   */
  backgroundColor?: string;

  /**
   * If true then the beak is visible. If false it will not be shown.
   * @default true
   */
  isBeakVisible?: boolean;

  /**
   * The target that the Callout should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target: HTMLElement | string | MouseEvent | IPoint | null;
}
