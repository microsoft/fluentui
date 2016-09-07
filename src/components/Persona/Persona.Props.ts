import * as React from 'react';
import { Persona } from './Persona';

export interface IPersonaProps extends React.HTMLProps<Persona> {
  /**
   * Primary text to display, usually the name of the person.
   */
  primaryText?: string;

  /**
   * Decides the size of the control.
   * @defaultvalue PersonaSize.regular
   */
  size?: PersonaSize;

  /**
   * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
   */
  imageUrl?: string;

  /**
   * The user's initials to display in the image area when there is no image.
   */
  imageInitials?: string;

  /**
   * The background color when the user's initials are displayed.
   * @defaultvalue PersonaInitialsColor.blue
   */
  initialsColor?: PersonaInitialsColor;

  /**
   * Presence of the person to display - will not display presence if undefined.
   * @defaultvalue PersonaPresence.none
   */
  presence?: PersonaPresence;

  /**
   * Secondary text to display, usually the role of the user.
   */
  secondaryText?: string;

  /**
   * Tertiary text to display, usually the status of the user.
   */
  tertiaryText?: string;

  /**
   * Optional text to display, usually a custom message set.
   */
  optionalText?: string;

  /**
   * Whether to not render persona details, and just render the persona image/initials.
   */
  hidePersonaDetails?: boolean;

  /**
   * Additional CSS class(es) to apply to the Persona
   */
  className?: string;
}

export enum PersonaSize {
  tiny,
  extraSmall,
  small,
  regular,
  large,
  extraLarge
}

export enum PersonaPresence {
  none,
  offline,
  online,
  away,
  dnd,
  blocked,
  busy
}

export enum PersonaInitialsColor {
  lightBlue,
  blue,
  darkBlue,
  teal,
  lightGreen,
  green,
  darkGreen,
  lightPink,
  pink,
  magenta,
  purple,
  black,
  orange,
  red,
  darkRed
}