import * as React from 'react';
import DocumentCard from './DocumentCard';
import DocumentCardTitle from './DocumentCardTitle';
import DocumentCardPreview from './DocumentCardPreview';
import DocumentCardLocation from './DocumentCardLocation';
import DocumentCardActivity from './DocumentCardLocation';
import DocumentCardActions from './DocumentCardActions';
import { PersonaInitialsColor } from '../Persona/index';

export interface IDocumentCardProps extends React.Props<DocumentCard> {
  /**
   * Function to call when the card is clicked.
   */
  onClick?: (ev?: any) => void;

  /**
   * A URL to navigate to when the card is clicked. If a function has also been provided,
   * it will be used instead of the URL.
   */
  onClickHref?: string;
}

export interface IDocumentCardPreviewProps extends React.Props<DocumentCardPreview> {
  /**
   * Path to the preview image.
   */
  previewImageSrc: string;

  /**
   * Path to the icon associated with this document type.
   */
  iconSrc?: string;

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
  locationHref: string;
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
  onClick?: (ev?: any) => void;
}
