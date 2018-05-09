import * as React from 'react';
import { Chiclet } from './Chiclet';
import {
  IChicletCardProps,
  IChicletCardStyleProps,
  IChicletCardStyles
} from './ChicletCard.types';
import {
  IStyle,
  ITheme
} from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IChiclet {

}

export interface IChicletProps extends React.Props<Chiclet> {
  /**
   * Props to render in the chosen ChicletCard
   */
  chicletCardProps?: IChicletCardProps | undefined;

  /** @todo: description */
  getStyles?: IStyleFunction<IChicletCardStyleProps, IChicletCardStyles>;

  /**
   * Chiclet size to render
   */
  size?: ChicletSize;

  /**
   * Footer to render for the component.
   */
  footer?: React.ReactElement<any>;
}

export enum ChicletSize {
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

export interface IChicletStyleProps {
  /**
   * Theme for the component.
   */
  theme?: ITheme;
}

export interface IChicletStyles {
  root?: IStyle;
}