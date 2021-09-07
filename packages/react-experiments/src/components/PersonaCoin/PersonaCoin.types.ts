import { ImageLoadState } from '@fluentui/react';
import type { IBaseProps } from '@fluentui/react';
import type {
  IComponentStyles,
  IHTMLSlot,
  ISlotProp,
  IComponent,
  IStyleableComponentProps,
} from '@fluentui/foundation-legacy';
import type { IPersonaPresenceSlot } from '../../utilities/factoryComponents.types';
import type { IPersonaCoinImageSlot } from './PersonaCoinImage/PersonaCoinImage.types';
import type { IPersonaCoinSize10Slot } from './PersonaCoinSize10/PersonaCoinSize10';
import type { IPersonaCoinInitialsSlot } from './PersonaCoinInitials/PersonaCoinInitials';

export type IPersonaCoinComponent = IComponent<
  IPersonaCoinProps,
  IPersonaCoinTokens,
  IPersonaCoinStyles,
  IPersonaCoinViewProps
>;

// These types are redundant with IPersonaCoinComponent but are needed until TS function
// return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IPersonaCoinTokenReturnType = ReturnType<Extract<IPersonaCoinComponent['tokens'], Function>>;
export type IPersonaCoinStylesReturnType = ReturnType<Extract<IPersonaCoinComponent['styles'], Function>>;

export type IPersonaCoinSlot = ISlotProp<IPersonaCoinProps, string>;

export interface IPersonaCoinSlots {
  /**
   * Slot for the root element.
   */
  root?: IHTMLSlot;

  /**
   * Slot for the image element
   */
  image?: IPersonaCoinImageSlot;

  /**
   * Slot for the initials element
   */
  initials?: IPersonaCoinInitialsSlot;

  /**
   * Slot for the presence element
   */
  presence?: IPersonaPresenceSlot;
  /**
   * Slot for the alternative coin for the smallest persona size
   */
  personaCoinSize10?: IPersonaCoinSize10Slot;
}

export type PersonaCoinSize = 10 | 16 | 24 | 28 | 32 | 40 | 48 | 56 | 72 | 100;

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IPersonaCoinProps
  extends IPersonaCoinSlots,
    IStyleableComponentProps<IPersonaCoinProps, IPersonaCoinTokens, IPersonaCoinStyles>,
    IBaseProps<IPersonaCoinComponent> {
  /**
   * Whether initials are calculated for phone numbers and number sequences.
   * Example: Set property to true to get initials for project names consisting of numbers only.
   * @defaultvalue false
   */
  allowPhoneInitials?: boolean;

  /**
   * The color that should be used when rendering the coin.
   */
  coinColor?: string;

  /**
   * This will be used to extract initials from if `initials` is not passed.
   */
  text?: string;

  /**
   * Size of the coin
   * @defaultvalue 48
   */
  size?: PersonaCoinSize;

  /**
   * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
   */
  imageUrl?: string;

  /**
   * If true, adds the css class 'is-fadeIn' to the image.
   * @defaultvalue true
   */
  imageShouldFadeIn?: boolean;

  /**
   * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
   * it is successfully loaded. This disables imageShouldFadeIn.
   * @defaultvalue true
   */
  imageShouldStartVisible?: boolean;

  /**
   * Alt text for the image to use.
   * @default `''` (empty string)
   */
  imageAlt?: string;

  /**
   * Optional callback for when loading state of the photo changes
   */
  onPhotoLoadingStateChange?: (newImageLoadState: ImageLoadState) => void;

  /**
   * The color of the user's initials that are displayed.
   * @defaultvalue 'white'
   */
  initialsColor?: string;
}

export interface IPersonaCoinViewProps extends IPersonaCoinProps {
  isPictureLoaded?: boolean;
}

export interface IPersonaCoinTokens {}

export type IPersonaCoinStyles = IComponentStyles<IPersonaCoinSlots>;
