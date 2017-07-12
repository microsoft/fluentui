import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { Persona } from './Persona';

export interface IPersona {

}

export interface IPersonaProps extends React.HTMLAttributes<Persona> {
  /**
   * Optional callback to access the IPersona interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IPersona) => void;

  /**
   * Primary text to display, usually the name of the person.
   */
  primaryText?: string;

  /**
   * Optional custom renderer for the primary text.
   */
  onRenderPrimaryText?: IRenderFunction<IPersonaProps>;

  /**
   * Decides the size of the control.
   * @defaultvalue PersonaSize.regular
   */
  size?: PersonaSize;

  /**
   * If true, adds the css class 'is-fadeIn' to the image.
   */
  imageShouldFadeIn?: boolean;

  /**
   * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
   * it is successfully loaded. This disables imageShouldFadeIn.
   * @defaultvalue false
   */
  imageShouldStartVisible?: boolean;

  /**
   * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
   */
  imageUrl?: string;

  /**
   * Alt text for the image to use. Defaults to an empty string.
   */
  imageAlt?: string;

  /**
   * The user's initials to display in the image area when there is no image.
   * @defaultvalue [Derived from primaryText]
   */
  imageInitials?: string;

  /**
   * Optional custom renderer for the initials
   */
  onRenderInitials?: IRenderFunction<IPersonaProps>;

  /**
   * The background color when the user's initials are displayed.
   * @defaultvalue [Derived from primaryText]
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
   * Optional custom renderer for the secondary text.
   */
  onRenderSecondaryText?: IRenderFunction<IPersonaProps>;

  /**
   * Tertiary text to display, usually the status of the user.
   */
  tertiaryText?: string;

  /**
   * Optional custom renderer for the tertiary text.
   */
  onRenderTertiaryText?: IRenderFunction<IPersonaProps>;

  /**
   * Optional text to display, usually a custom message set.
   */
  optionalText?: string;

  /**
   * Optional custom renderer for the optional text.
   */
  onRenderOptionalText?: IRenderFunction<IPersonaProps>;

  /**
   * Whether to not render persona details, and just render the persona image/initials.
   */
  hidePersonaDetails?: boolean;

  /**
   * Additional CSS class(es) to apply to the Persona
   */
  className?: string;

  /*
   * If true, show the secondary text line regardless of the size of the persona
   */
  showSecondaryText?: boolean;
}

export enum PersonaSize {
  tiny = 0,
  extraExtraSmall = 1,
  extraSmall = 2,
  small = 3,
  regular = 4,
  large = 5,
  extraLarge = 6,
  size28 = 7,
  size16 = 8
}

export enum PersonaPresence {
  none = 0,
  offline = 1,
  online = 2,
  away = 3,
  dnd = 4,
  blocked = 5,
  busy = 6
}

export enum PersonaInitialsColor {
  lightBlue = 0,
  blue = 1,
  darkBlue = 2,
  teal = 3,
  lightGreen = 4,
  green = 5,
  darkGreen = 6,
  lightPink = 7,
  pink = 8,
  magenta = 9,
  purple = 10,
  black = 11,
  orange = 12,
  red = 13,
  darkRed = 14
}
