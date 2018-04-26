import * as React from 'react';
import { Chiclet } from './Chiclet';
import { IChicletCardProps } from './ChicletCard.types';

export interface IChiclet {

}

export interface IChicletProps extends React.Props<Chiclet> {
  /**
   * Props to render in the chosen ChicletCard
   */
  chicletCardProps?: IChicletCardProps | undefined;

  /**
   * Chiclet size to render
   */
  size?: ChicletType;

  /**
   * Action icon buttons to render.
   */
  actions?: string[];
}

export enum ChicletType {
  /**
   * X-Small Chiclet
   */
  xsmall = 0,

  /**
   * Small Chiclet
   */
  small = 1,

  /**
   * Medium Chiclet
   */
  medium = 2,

  /**
   * Large Chiclet
   */
  large = 3
}