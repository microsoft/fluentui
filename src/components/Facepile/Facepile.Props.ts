import * as React from 'react';
import Facepile from './Facepile';
import { PersonaInitialsColor } from '../Persona/index';

export interface IFacepileProps extends React.Props<Facepile> {
  /**
   * Array of IPersonaProps that define each Persona. Note that the size
   * is fixed at PersonaSize.extraSmall regardless of what is specified.
   */
  personas: IFacepilePersona[];
}

export interface IFacepilePersona {
  /**
   * Name of the person.
   */
  personaName?: string;

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
}
