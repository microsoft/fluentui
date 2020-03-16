import * as React from 'react';
import { FacepileBase } from './Facepile.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IButtonProps } from '../../Button';
import { IPersonaSharedProps, PersonaInitialsColor, PersonaSize } from '../../Persona';
import { IKeytipProps } from '../../Keytip';

/**
 * {@docCategory Facepile}
 */
export interface IFacepile {}

/**
 * {@docCategory Facepile}
 */
export interface IFacepileProps extends React.ClassAttributes<FacepileBase> {
  /**
   * Optional callback to access the IFacepile interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IFacepile>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IFacepileStyleProps, IFacepileStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Facepile
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Array of IPersonaProps that define each Persona.
   */
  personas: IFacepilePersona[];

  /**
   * Personas to place in the overflow
   */
  overflowPersonas?: IFacepilePersona[];

  /** Maximum number of personas to show */
  maxDisplayablePersonas?: number;

  /** Size to display the personas */
  personaSize?: PersonaSize;

  /** ARIA label for persona list */
  ariaDescription?: string;

  /**
   * Defines the aria label that the screen readers use when focus goes on a list of personas.
   */
  ariaLabel?: string;

  /** Show add person button */
  showAddButton?: boolean;

  /** Button properties for the add face button */
  addButtonProps?: IButtonProps;

  /**
   * Deprecated at v0.70, use `overflowButtonProps` instead.
   * @deprecated Use `overflowButtonProps` instead.
   */
  chevronButtonProps?: IButtonProps;

  /** Properties for the overflow icon */
  overflowButtonProps?: IButtonProps;

  /** Type of overflow icon to use */
  overflowButtonType?: OverflowButtonType;

  /** Optional custom renderer for the persona, gets called when there is one persona in personas array*/
  onRenderPersona?: IRenderFunction<IFacepilePersona>;

  /** Optional custom renderer for the persona coins, gets called when there are multiple persona in personas array*/
  onRenderPersonaCoin?: IRenderFunction<IFacepilePersona>;

  /** Method to access properties on the underlying Persona control */
  getPersonaProps?: (persona: IFacepilePersona) => IPersonaSharedProps;
}

/**
 * {@docCategory Facepile}
 */
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
   * Whether initials are calculated for phone numbers and number sequences.
   * Example: Set property to true to get initials for project names consisting of numbers only.
   * @defaultvalue false
   */
  allowPhoneInitials?: boolean;

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

  /**
   * Optional keytip for this button that is only added when 'onClick' is defined for the persona
   */
  keytipProps?: IKeytipProps;
}

/**
 * {@docCategory Facepile}
 */
export enum OverflowButtonType {
  /** No overflow */
  none = 0,
  /** +1 overflow icon */
  descriptive = 1,
  /** More overflow icon */
  more = 2,
  /** Chevron overflow icon */
  downArrow = 3,
}

/**
 * {@docCategory Facepile}
 */
export interface IFacepileStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Pixel value for spacing around button. Number value set in pixels
   */
  spacingAroundItemButton?: number;
}

/**
 * {@docCategory Facepile}
 */
export interface IFacepileStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  addButton: IStyle;
  descriptiveOverflowButton: IStyle;
  itemContainer: IStyle;
  itemButton: IStyle;
  members: IStyle;
  member: IStyle;
  overflowButton: IStyle;
  overflowInitialsIcon: IStyle;
  screenReaderOnly: IStyle;
}
