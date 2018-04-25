import * as React from 'react';
import { BaseChiclet } from './BaseChiclet';
import { ChicletCard } from './ChicletCard';
import { Chiclet } from './Chiclet';
import { IStyle, ITheme } from '../../Styling';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IStyleFunction } from '../../Utilities';

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

export interface IBaseChicletProps extends React.Props<BaseChiclet> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChiclet | null) => void;

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

export interface IChicletCardProps extends React.Props<ChicletCard> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChiclet | null) => void;

  /**
   * Optional class for ChicletCard.
   */
  className?: string;

  /**
   * Function to call when the card is clicked or keyboard Enter/Space is pushed.
   */
  onClick?: (ev?: React.SyntheticEvent<HTMLElement>) => void;

  /**
   * A URL to navigate to when the card is clicked. If a function has also been provided,
   * it will be used instead of the URL.
   */
  onClickHref?: string;

  /**
   * Action icon buttons to render.
   */
  actions?: IButtonProps[] | undefined;

  /**
   * Styling for the ChicletCard.
   */
  styles?: IChicletStyles;

  theme?: ITheme;

  /**
   * OpenGraph props.
   */
  title?: string;
  ogType?: string;
  description?: string;
  image?: string;
  imageSecureUrl?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  url?: string;
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