import * as React from 'react';
import { Chiclet } from './Chiclet';
import { IChicletCardProps } from './ChicletCard.types';
import { IStyle, ITheme } from '../../Styling';

export interface IChiclet {

}

export interface IChicletStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the icon that overlays the file preview image.
   */
  icon?: IStyle;

  /**
   * Style for the file preview image.
   */
  preview?: IStyle;

  /**
   * Style for preview information about the file, such as title and link.
   */
  info?: IStyle;

  /**
   * Style for the title of the file.
   */
  title?: IStyle;

  /**
   * Style for the link to the file.
   */
  link?: IStyle;

  /**
   * Style for the collective actions in the lower right of the component.
   */
  actions?: IStyle;

  /**
   * Style for the individual actions in the lower right of the component.
   */
  action?: IStyle;
}

export interface IChicletStyleProps {

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

  /**
   * Styling for the Chiclet.
   */
  styles?: IChicletStyles;

  theme?: ITheme;
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