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

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
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
   * Footer to render for the component.
   */
  footer?: React.ReactElement<any>

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