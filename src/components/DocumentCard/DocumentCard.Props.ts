import * as React from 'react';
import DocumentCard from './DocumentCard';
import DocumentCardTitle from './DocumentCardTitle';
import DocumentCardPreview from './DocumentCardPreview';
import DocumentCardLocation from './DocumentCardLocation';
import DocumentCardEntity from './DocumentCardLocation';
import DocumentCardActions from './DocumentCardActions';

export interface IDocumentCardProps extends React.Props<DocumentCard> {
  /**
   * The width of the card in pixels. If not specified, it will adapt to fit
   * its container with a minimum width of 206px and a maximum of 320px.
   */
  width?: Number;

  /**
   * A function to call when the card is clicked.
   */
  onClickFunction?: (ev?: any) => void;

  /**
   * A URL to navigate to when the card is clicked. If a function has also been provided,
   * it will be used instead of the URL.
   */
  onClickURL?: string;
}

export interface IDocumentCardPreviewProps extends React.Props<DocumentCardPreview> {
  /**
   * Path to the preview image.
   */
  previewImagePath: string;

  /**
   * Path to the icon.
   */
  iconPath?: string;

  /**
   * Hex color value of the line below the preview, which should correspond to the document type.
   */
  accentColor?: string;
}

export interface IDocumentCardTitleProps extends React.Props<DocumentCardTitle> {
  /**
   * Title text.
   */
  title: string;
}

export interface IDocumentCardLocationProps extends React.Props<DocumentCardLocation> {
  /**
   * Location of the document.
   */
  location: string;

  /**
   * URL to navigate to for this location.
   */
  locationURL: string;
}

export interface IDocumentCardEntityProps extends React.Props<DocumentCardEntity> {
  /**
   * Path to the image for this entity, such as a profile image.
   */
  imagePath: string;

  /**
   * One to three lines of detail text for this entity.
   */
  details: IDocumentCardEntityDetail[];
}

export interface IDocumentCardEntityDetail {
  /**
   * The text of the detail.
   */
  text: string;

  /**
   * Specifies if the text should be presented in bold.
   */
  isBold?: boolean;
}

export interface IDocumentCardActionsProps extends React.Props<DocumentCardActions> {
  /**
   * The actions available for this document.
   */
  actions: IDocumentCardAction[];

  /**
   * The number of views this document has received.
   */
  views?: Number;
}

export interface IDocumentCardAction {
  /**
   * The icon for this action.
   */
  icon: string;

  /**
   * Function to run when clicking the action.
   */
  onClickFunction?: (ev?: any) => void;
}
