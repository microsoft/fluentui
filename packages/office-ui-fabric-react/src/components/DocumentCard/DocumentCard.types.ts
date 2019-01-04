import * as React from 'react';
import { DocumentCardLocation } from './DocumentCardLocation';
import { DocumentCardActivity } from './DocumentCardActivity';
import { DocumentCardActions } from './DocumentCardActions';
import { DocumentCardLogo } from './DocumentCardLogo';
import { PersonaInitialsColor } from '../../Persona';
import { IButtonProps } from '../../Button';
import { IBaseProps, IRefObject } from '../../Utilities';

export interface IDocumentCard {
  /**
   * Sets focus to the DocumentCard.
   */
  focus: () => void;
}

export interface IDocumentCardProps extends IBaseProps<IDocumentCard> {
  /**
   * Optional callback to access the IDocumentCard interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDocumentCard>;

  /**
   * The type of DocumentCard to display.
   * @defaultvalue DocumentCardType.normal
   */
  type?: DocumentCardType;

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
   * Optional class for document card.
   */
  className?: string;

  /**
   * Hex color value of the line below the card, which should correspond to the document type.
   * This should only be supplied when using the 'compact' card layout.
   *
   * Deprecated at v4.17.1, to be removed at \>= v5.0.0.
   * @deprecated To be removed at v5.0.0.
   */
  accentColor?: string;
}

export enum DocumentCardType {
  /**
   * Standard DocumentCard.
   */
  normal = 0,
  /**
   * Compact layout. Displays the preview beside the details, rather than above.
   */
  compact = 1
}

export interface IDocumentCardLocationProps extends React.ClassAttributes<DocumentCardLocation> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

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

export interface IDocumentCardActivityProps extends React.ClassAttributes<DocumentCardActivity> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

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
   * Whether initials are calculated for phone numbers and number sequences.
   * Example: Set property to true to get initials for project names consisting of numbers only.
   * @defaultvalue false
   */
  allowPhoneInitials?: boolean;

  /**
   * The background color when the user's initials are displayed.
   * @defaultvalue PersonaInitialsColor.blue
   */
  initialsColor?: PersonaInitialsColor;
}

export interface IDocumentCardActionsProps extends React.ClassAttributes<DocumentCardActions> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * The actions available for this document.
   */
  actions: IButtonProps[];

  /**
   * The number of views this document has received.
   */
  views?: Number;
}

export interface IDocumentCardLogoProps extends React.ClassAttributes<DocumentCardLogo> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;
  /**
   * Describes DocumentCard Logo badge.
   */
  logoIcon: string;

  /**
   * Describe Logo name, optional.
   */
  logoName?: string;
}
