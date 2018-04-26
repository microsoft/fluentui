import * as React from 'react';
import { BaseChiclet } from './BaseChiclet';
import { ChicletType } from './Chiclet.types';

export interface IBaseChiclet {

}

export interface IBaseChicletProps extends React.Props<BaseChiclet> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IBaseChiclet | null) => void;

  /**
   * Optional class for chiclet.
   */
  className?: string;

  /**
   * Sharing link
   */
  url: string;

  /**
   * Chiclet size to render
   */
  size?: ChicletType;

  /**
   * Action icon buttons to render.
   */
  actions?: string[];
}