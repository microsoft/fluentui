import * as React from 'react';
import { Chiclet } from './Chiclet';
import { ChicletCard } from './ChicletCard';
import { ChicletPicker } from './ChicletPicker';
import { IStyle } from '../../Styling';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface IChiclet {

}

export interface IChicletStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}

export interface IChicletProps extends React.Props<Chiclet> {
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
  size?: string;

  /**
   * Action icon buttons to render.
   */
  actions?: IButtonProps[];
}

export interface IChicletPickerProps extends React.Props<ChicletPicker> {
  /**
   * Props to render in the chosen ChicletCard
   */
  chicletCardProps?: IChicletCardProps | undefined;

  /**
   * Chiclet size to render
   */
  size?: string;

  /**
   * Action icon buttons to render.
   */
  actions?: IButtonProps[];
}

export interface IChicletCardProps extends React.Props<ChicletCard> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChiclet | null) => void;

  /**
  * The type of Chiclet to display.
  * @default Chiclet.anonymous
  */
  type?: ChicletType;

  /**
   * Optional class for chiclet.
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