import * as React from 'react';
import { PersonaInitialsColor } from '../../Persona';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { DocumentCardActivityBase } from './DocumentCardActivity.base';

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardActivity {}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardActivityProps extends React.ClassAttributes<DocumentCardActivityBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IDocumentCardActivity>;

  /**
   * Describes the activity that has taken place, such as "Created Feb 23, 2016".
   */
  activity: string;

  /**
   * One or more people who are involved in this activity.
   */
  people: IDocumentCardActivityPerson[];

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDocumentCardActivityStyleProps, IDocumentCardActivityStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional override class name
   */
  className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
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

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardActivityStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * Indicates if multiple people are being shown.
   */
  multiplePeople?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export interface IDocumentCardActivityStyles {
  root: IStyle;
  avatars: IStyle;
  avatar: IStyle;
  details: IStyle;
  name: IStyle;
  activity: IStyle;
}
