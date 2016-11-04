import * as React from 'react';
import { DocumentCard } from './DocumentCard';
import { DocumentCardTitle } from './DocumentCardTitle';
import { DocumentCardPreview } from './DocumentCardPreview';
import { DocumentCardLocation } from './DocumentCardLocation';
import { DocumentCardActivity } from './DocumentCardActivity';
import { DocumentCardActions } from './DocumentCardActions';
import { PersonaInitialsColor } from '../../Persona';
import { ImageFit } from '../../Image';
import { IButtonProps } from '../../Button';

export interface IDocumentCardProps extends React.Props<DocumentCard> {
  /**
  * The type of DocumentCard to display.
  * @default DocumentCardType.normal
  */
  type?: DocumentCardType;

  /**
   * Function to call when the card is clicked.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * A URL to navigate to when the card is clicked. If a function has also been provided,
   * it will be used instead of the URL.
   */
  onClickHref?: string;

  /**
   * Optional class for document card.
   */
  className?: string;

  /**
   * Hex color value of the line below the card, which should correspond to the document type.
   * This should only be supplied when using the 'compact' card layout.
   */
  accentColor?: string;
}

export enum DocumentCardType {
  /**
   * Standard DocumentCard.
   */
  normal,
  /**
   * Compact layout. Displays the preview beside the details, rather than above.
   */
  compact
}

export interface IDocumentCardPreviewProps extends React.Props<DocumentCardPreview> {
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

export interface IDocumentCardPreviewImage {
  /**
   * File name for the document this preview represents.
   */
  name?: string;

  /**
   * URL to view the file.
   */
  url?: string;

  /**
   * Path to the preview image.
   */
  previewImageSrc?: string;

  /**
   * Path to the image to display if the preview image won't load.
   */
  errorImageSrc?: string;

  /**
   * Path to the icon associated with this document type.
   */
  iconSrc?: string;

  /**
   * If provided, forces the preview image to be this width.
   */
  width?: number;

  /**
   * If provided, forces the preview image to be this height.
   */
  height?: number;

  /**
   * Used to determine how to size the image to fit the dimensions of the component.
   * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
   */
  imageFit?: ImageFit;

  /**
   * Hex color value of the line below the preview, which should correspond to the document type.
   */
  accentColor?: string;
}

export interface IDocumentCardTitleProps extends React.Props<DocumentCardTitle> {
  /**
   * Title text. If the card represents more than one document, this should be the title of one document and a "+X" string. For example, a collection of four documents would have a string of "Document.docx +3".
   */
  title: string;

  /**
   * Whether we truncate the title to fit within the box. May have a performance impact.
   * @defaultvalue true
   */
  shouldTruncate?: boolean;
}

export interface IDocumentCardLocationProps extends React.Props<DocumentCardLocation> {
  /**
   * Text for the location of the document.
   */
  location: string;

  /**
   * URL to navigate to for this location.
   */
  locationHref?: string;

  /**
   * Function to call when the location is clicked.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Aria label for the link to the document location.
   */
  ariaLabel?: string;
}

export interface IDocumentCardActivityProps extends React.Props<DocumentCardActivity> {
  /**
   * Describes the activity that has taken place, such as "Created Feb 23, 2016".
   */
  activity: string;

  /**
   * One or more people who are involved in this activity.
   */
  people: IDocumentCardActivityPerson[];
}

export interface IDocumentCardActivityPerson {
  /**
   * The name of the person.
   */
  name: string;

  /**
   * Path to the profile photo of the person.
   */
  profileImageSrc: string;

  /**
   * The user's initials to display in the profile photo area when there is no image.
   */
  initials?: string;

  /**
   * The background color when the user's initials are displayed.
   * @defaultvalue PersonaInitialsColor.blue
   */
  initialsColor?: PersonaInitialsColor;
}

export interface IDocumentCardActionsProps extends React.Props<DocumentCardActions> {
  /**
   * The actions available for this document.
   */
  actions: IButtonProps[];

  /**
   * The number of views this document has received.
   */
  views?: Number;
}
