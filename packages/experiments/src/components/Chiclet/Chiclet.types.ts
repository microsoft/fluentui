import * as React from 'react';
import { Chiclet } from './Chiclet';
import { ChicletCard } from './ChicletCard';
import { IStyle } from '../../Styling';
//import { IStyleFunction } from '../../Utilities';
//import { ImageFit } from '../../../office-ui-fabric-react/src/components/Image';
//import { IIconProps } from '../../Icon';

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

}

export interface IChicletCardProps extends React.Props<ChicletCard> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChiclet | null) => void;

  /**
  * The type of DocumentCard to display.
  * @default Chiclet.anonymous
  */
  type?: ChicletType;

  /**
   * Optional class for chiclet.
   */
  className?: string;

  /**
   * OpenGraph props.
   */
  title?: string;
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
   * Standard Chiclet for anonymous sharing links.
   */
  anonymous = 0,

  /**
   * Chiclet for authenticated users.
   */
  authenticated = 1,
}

// export interface OpenGraphObject {
//   title?: string,
//   type?: string,
//   image?: string,
//   imageUrl?: string,
//   imageSecureUrl?: string,
//   imageWidth?: string,
//   imageHeight?: string,
//   url?: string,
//   description?: string
// }