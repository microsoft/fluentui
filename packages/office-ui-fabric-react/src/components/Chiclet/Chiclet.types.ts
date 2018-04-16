import * as React from 'react';
import { Chiclet } from './Chiclet';
import { ChicletPreview } from './ChicletPreview';
import { ChicletTitle } from './ChicletTitle';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';
import { ImageFit } from '../../Image';
import { IIconProps } from '../../Icon';
import { IDocumentCardPreviewProps, IDocumentCardPreviewImage } from '../DocumentCard/DocumentCard.types';

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
  imageUrl?: string;
  imageSecureUrl?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  url?: string;
  [key: string]: any;
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

export interface IChicletPreviewProps extends React.Props<ChicletPreview> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * One or more preview images to display.
   */
  previewImages: IDocumentCardPreviewImage[];

  /**
   * The function return string that will describe the number of overflow documents.
   * such as  (overflowCount: number) => `+${ overflowCount } more`,
   */
  getOverflowDocumentCountText?: (overflowCount: number) => string;
}
export interface IChicletTitleProps extends React.Props<ChicletTitle> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * Title text. If the card represents more than one document, this should be the title of one document and a "+X" string. For example, a collection of four documents would have a string of "Document.docx +3".
   */
  title: string;

  /**
   * Whether we truncate the title to fit within the box. May have a performance impact.
   * @defaultvalue true
   */
  shouldTruncate?: boolean;

  /**
   * Whether show as title as secondary title style such as smaller font and lighter color.
   * @defaultvalue false
   */
  showAsSecondaryTitle?: boolean;
}


export interface IChicletPreviewImage extends IDocumentCardPreviewImage {

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