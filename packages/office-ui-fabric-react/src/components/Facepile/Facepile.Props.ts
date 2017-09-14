import * as React from 'react';
import { Facepile } from './Facepile';
import { IButtonProps } from '../Button/index';
import {
  IPersonaProps,
  PersonaInitialsColor,
  PersonaSize
} from '../Persona/index';

export interface IFacepile {

}

export interface IFacepileProps extends React.Props<Facepile> {
  /**
   * Optional callback to access the IFacepile interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IFacepile) => void;

  /**
   * Array of IPersonaProps that define each Persona. Note that the size
   * is fixed at PersonaSize.extraSmall regardless of what is specified.
   */
  personas: IFacepilePersona[];

  /** Maximum number of personas to show */
  maxDisplayablePersonas?: number;

  /** Size to display the personas */
  personaSize?: PersonaSize;

  /** ARIA label for persona list */
  ariaDescription?: string;

  /** Show add person button */
  showAddButton?: boolean;

  /** Button properties for the add face button */
  addButtonProps?: IButtonProps;

  /**
   * Deprecated at v0.70, use 'overflowButtonProps' instead;
   * @deprecated
   */
  chevronButtonProps?: IButtonProps;

  /** Properties for the overflow icon */
  overflowButtonProps?: IButtonProps;

  /** Type of overflow icon to use */
  overflowButtonType?: OverflowButtonType;

  /** Method to access properties on the underlying Persona control */
  getPersonaProps?: (persona: IFacepilePersona) => IPersonaProps;

  /**
   * Optional class for Facepile root element.
   */
  className?: string;
}

export interface IFacepilePersona extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
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
   * @defaultvalue [Derived from personaName]
   */
  imageInitials?: string;

  /**
   * The background color when the user's initials are displayed.
   * @defaultvalue [Derived from personaName]
   */
  initialsColor?: PersonaInitialsColor;

  /**
   * If provided, persona will be rendered with cursor:pointer and the handler will be
   * called on click.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;

  /**
   * If provided, the handler will be called on mouse move.
   */
  onMouseMove?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;

  /**
   * If provided, the handler will be called when mouse moves out of the component.
   */
  onMouseOut?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;

  /**
   * Extra data - not used directly but can be handy for passing additional data to custom event
   * handlers.
   */
  data?: any;
}

export enum OverflowButtonType {
  /** No overflow */
  none = 0,
  /** +1 overflow icon */
  descriptive = 1,
  /** More overflow icon */
  more = 2,
  /** Chevron overflow icon */
  downArrow = 3
}
