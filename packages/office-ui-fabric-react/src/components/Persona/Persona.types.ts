import * as React from 'react';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { PersonaBase } from './Persona.base';
import { ImageLoadState } from '../../Image';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';
import { PersonaCoinBase } from './PersonaCoin/PersonaCoin.base';

/**
 * {@docCategory Persona}
 */
export interface IPersona {}

/**
 * {@docCategory Persona}
 */
export interface IPersonaSharedProps extends React.HTMLAttributes<PersonaBase | PersonaCoinBase | HTMLDivElement> {
  /**
   * Primary text to display, usually the name of the person.
   */
  text?: string;

  /**
   * Decides the size of the control.
   * @defaultvalue PersonaSize.size48
   */
  size?: PersonaSize;

  /**
   * Optional custom renderer for the coin
   */
  onRenderCoin?: IRenderFunction<IPersonaSharedProps>;

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
   * @defaultvalue [Derived from text]
   */
  imageInitials?: string;

  /**
   * Whether initials are calculated for phone numbers and number sequences.
   * Example: Set property to true to get initials for project names consisting of numbers only.
   * @defaultvalue false
   */
  allowPhoneInitials?: boolean;

  /**
   * Optional custom renderer for the initials
   */
  onRenderInitials?: IRenderFunction<IPersonaSharedProps>;

  /**
   * Optional callback for when loading state of the photo changes
   */
  onPhotoLoadingStateChange?: (newImageLoadState: ImageLoadState) => void;

  /**
   * The background color when the user's initials are displayed.
   * @defaultvalue [Derived from text]
   */
  initialsColor?: PersonaInitialsColor | string;

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
   * Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using Size72 or Size100.
   */
  tertiaryText?: string;

  /**
   * Optional text to display, usually a custom message set. The optional text will only be shown when using Size100.
   */
  optionalText?: string;

  /**
   * Whether to not render persona details, and just render the persona image/initials.
   */
  hidePersonaDetails?: boolean;

  /*
   * If true, show the secondary text line regardless of the size of the persona
   */
  showSecondaryText?: boolean;

  /**
   * If true, show the special coin for unknown persona.
   * It has '?' in place of initials, with static font and background colors
   */
  showUnknownPersonaCoin?: boolean;

  /**
   * If true renders the initials while the image is loading.
   * This only applies when an imageUrl is provided.
   * @defaultvalue false
   */
  showInitialsUntilImageLoads?: boolean;

  /**
   * Optional custom persona coin size in pixel.
   */
  coinSize?: number;

  /**
   * Optional HTML element props for Persona coin.
   */
  coinProps?: IPersonaCoinProps;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Primary text to display, usually the name of the person.
   * @deprecated Use `text` instead.
   */
  primaryText?: string;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaProps extends IPersonaSharedProps {
  /**
   * Optional callback to access the IPersona interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPersona>;

  /**
   * Additional CSS class(es) to apply to the Persona
   */
  className?: string;

  /**
   * Call to provide customized styling that will layer on top of variant rules
   */
  styles?: IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>;

  /**
   * Optional custom renderer for the primary text.
   */
  onRenderPrimaryText?: IRenderFunction<IPersonaProps>;

  /**
   * Optional custom renderer for the secondary text.
   */
  onRenderSecondaryText?: IRenderFunction<IPersonaProps>;

  /**
   * Optional custom renderer for the tertiary text.
   */
  onRenderTertiaryText?: IRenderFunction<IPersonaProps>;

  /**
   * Optional custom renderer for the optional text.
   */
  onRenderOptionalText?: IRenderFunction<IPersonaProps>;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Optional custom persona coin size in pixel.
   */
  coinSize?: number;

  /**
   * Decides the size of the control.
   * @defaultvalue PersonaSize.size48
   */
  size?: PersonaSize;

  /**
   * Presence of the person to display - will not display presence if undefined.
   * @defaultvalue PersonaPresence.none
   */
  presence?: PersonaPresence;

  /*
   * If true, show the secondary text line regardless of the size of the persona
   */
  showSecondaryText?: boolean;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaStyles {
  root: IStyle;
  details: IStyle;
  primaryText: IStyle;
  secondaryText: IStyle;
  tertiaryText: IStyle;
  optionalText: IStyle;
  textContent: IStyle;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaCoinProps extends IPersonaSharedProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IPersonaCoinStyleProps, IPersonaCoinStyles>;

  /**
   * Additional css class to apply to the PersonaCoin
   * @defaultvalue undefined
   */
  className?: string;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaCoinStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Decides the size of the control.
   * @defaultvalue PersonaSize.size48
   */
  size?: PersonaSize;

  /**
   * Optional custom persona coin size in pixel.
   */
  coinSize?: number;

  /**
   * Decides whether to display coin for unknown persona
   */
  showUnknownPersonaCoin?: boolean;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaCoinStyles {
  coin: IStyle;
  imageArea: IStyle;
  image: IStyle;
  initials: IStyle;
  size10WithoutPresenceIcon: IStyle;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaPresenceProps extends IPersonaSharedProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IPersonaPresenceStyleProps, IPersonaPresenceStyles>;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaPresenceStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Presence of the person to display - will not display presence if undefined.
   * @defaultvalue PersonaPresence.none
   */
  presence?: PersonaPresence;

  /**
   * Decides the size of the control.
   * @defaultvalue PersonaSize.size48
   */
  size?: PersonaSize;
}

/**
 * {@docCategory Persona}
 */
export interface IPersonaPresenceStyles {
  presence: IStyle;
  presenceIcon: IStyle;
}

/**
 * {@docCategory Persona}
 */
export enum PersonaSize {
  /**
   * `tiny` size has been deprecated in favor of standardized numeric sizing. Use `size8` instead.
   * @deprecated Use `size8` instead.
   */
  tiny = 0,

  /**
   *
   * `extraExtraSmall` size has been deprecated in favor of standardized numeric sizing. Use `size24` instead.
   * @deprecated Use `size24` instead.
   */
  extraExtraSmall = 1,

  /**
   * `extraSmall` size has been deprecated in favor of standardized numeric sizing. Use `size32` instead.
   * @deprecated Use `size32` instead.
   */
  extraSmall = 2,

  /**
   * `small` size has been deprecated in favor of standardized numeric sizing. Use `size40` instead.
   * @deprecated Use `size40` instead.
   */
  small = 3,

  /**
   * `regular` size has been deprecated in favor of standardized numeric sizing. Use `size48` instead.
   * @deprecated Use `size48` instead.
   */
  regular = 4,

  /**
   * `large` size has been deprecated in favor of standardized numeric sizing. Use `size72` instead.
   * @deprecated Use `size72` instead.
   */
  large = 5,

  /**
   * `extraLarge` size has been deprecated in favor of standardized numeric sizing. Use `size100` instead.
   * @deprecated Use `size100` instead.
   */
  extraLarge = 6,

  /**
   * No `PersonaCoin` is rendered.
   */
  size8 = 17,

  /**
   * No `PersonaCoin` is rendered. Deprecated in favor of `size8` to align with design specifications.
   * @deprecated Use `size8` instead. Will be removed in a future major release.
   */
  size10 = 9,

  /**
   * Renders a 16px `PersonaCoin`. Deprecated due to not being in the design specification.
   * @deprecated Will be removed in a future major release.
   */
  size16 = 8,

  /**
   * Renders a 24px `PersonaCoin`.
   */
  size24 = 10,

  /**
   * Renders a 28px `PersonaCoin`. Deprecated due to not being in the design specification.
   * @deprecated Will be removed in a future major release.
   */
  size28 = 7,

  /**
   * Renders a 32px `PersonaCoin`.
   */
  size32 = 11,

  /**
   * Renders a 40px `PersonaCoin`.
   */
  size40 = 12,

  /**
   * Renders a 48px `PersonaCoin`.
   */
  size48 = 13,

  /**
   * Renders a 56px `PersonaCoin`.
   */
  size56 = 16,

  /**
   * Renders a 72px `PersonaCoin`.
   */
  size72 = 14,

  /**
   * Renders a 100px `PersonaCoin`.
   */
  size100 = 15
}

/**
 * {@docCategory Persona}
 */
export enum PersonaPresence {
  none = 0,
  offline = 1,
  online = 2,
  away = 3,
  dnd = 4,
  blocked = 5,
  busy = 6
}

/**
 * {@docCategory Persona}
 */
export enum PersonaInitialsColor {
  // Old color names
  /**
   * @deprecated Use lightBlue30 instead
   */
  lightBlue = 0,
  /**
   * @deprecated Use blue20 instead
   */
  blue = 1,
  /**
   * @deprecated Use darkBlue10 instead
   */
  darkBlue = 2,
  /**
   * @deprecated Use teal10 instead
   */
  teal = 3,
  /**
   * @deprecated Use green10 instead
   */
  lightGreen = 4,
  /**
   * @deprecated Use green10 instead
   */
  green = 5,
  /**
   * @deprecated Use darkGreen20 instead
   */
  darkGreen = 6,
  /**
   * @deprecated Use lightPink10 instead
   */
  lightPink = 7,
  /**
   * @deprecated Use pink10 instead
   */
  pink = 8,
  /**
   * @deprecated Use magenta10 instead
   */
  magenta = 9,
  /**
   * @deprecated Use purple10 instead
   */
  purple = 10,
  /**
   * Black is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides
   * @deprecated Use gray40 instead
   */
  black = 11,
  /**
   * @deprecated Use orange10 instead
   */
  orange = 12,
  /**
   * Red is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides
   * @deprecated Use red10 instead
   */
  red = 13,
  /**
   * @deprecated Use darkRed20 instead
   */
  darkRed = 14,
  /**
   * Transparent is not intended to be used with typical initials due to accessibility issues.
   * Its primary use is for overflow buttons, so it is considered a reserved color and can only be set with overrides.
   */
  transparent = 15,
  /**
   * @deprecated Use violet10 instead
   */
  violet = 16,

  // New color names
  green10 = 25,
  darkGreen20 = 26,
  teal10 = 27,
  cyan30 = 28,
  lightBlue30 = 29,
  blue20 = 30,
  darkBlue10 = 31,
  violet10 = 32,
  purple10 = 33,
  magenta10 = 34,
  lightPink10 = 35,
  pink10 = 36,
  pinkRed10 = 37,
  red10 = 38,
  darkRed20 = 39,
  orange10 = 40,
  orange30 = 41,
  orangeYellow20 = 42,
  gray30 = 43,
  gray40 = 44,
  gray20 = 45
}
