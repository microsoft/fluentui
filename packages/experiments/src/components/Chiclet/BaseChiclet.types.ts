import * as React from 'react';
import { BaseChicletBase } from './BaseChiclet.base';
import { ChicletSize } from './Chiclet.types';
import { IStyleFunction } from '../../Utilities';
import {
  IStyle,
  ITheme
} from '../../Styling';

export interface IBaseChiclet {

}

export interface IBaseChicletProps extends React.Props<BaseChicletBase> {
  /**
   * Optional callback to access the IBaseChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IBaseChiclet | null) => void;

  /** @todo: description */
  getStyles?: IStyleFunction<IBaseChicletStyleProps, IBaseChicletStyles>;

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
  size?: ChicletSize;

  /**
   * Action icon buttons to render.
   */
  actions?: string[];

  /**
   * Theme for the component.
   */
  theme?: ITheme;
}

export interface IBaseChicletStyleProps {
  /**
   * Theme for the component.
   */
  theme?: ITheme;
}

export interface IBaseChicletStyles {
  root?: IStyle;
}