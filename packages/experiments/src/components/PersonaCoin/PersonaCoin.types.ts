import { ImageLoadState, IRefObject } from 'office-ui-fabric-react';
import { IComponentStyles, IHTMLDivSlot, ISlotProp, IComponent, IStyleableComponentProps } from '../../Foundation';
import { IPersonaPresenceSlot } from '../../utilities/factoryComponents.types';
import { IPersonaCoinImageSlot } from './PersonaCoinImage/PersonaCoinImage.types';

export type IPersonaCoinComponent = IComponent<IPersonaCoinProps, IPersonaCoinTokens, IPersonaCoinStyles, IPersonaCoinViewProps>;

export type IPersonaCoinSlot = ISlotProp<IPersonaCoinProps> | string;

export type IPersonaCoinForSmallestSizeSlot = ISlotProp<{}>;

export interface IPersonaCoinSlots {
  /**
   * Slot for the root element.
   */
  root?: IHTMLDivSlot;

  /**
   * Slot for the image element
   */
  image?: IPersonaCoinImageSlot;

  /**
   * Slot for the initials element
   */
  initials?: IPersonaCoinSlot;

  /**
   * Slot for the presence element
   */
  presence?: IPersonaPresenceSlot;
  /**
   * Slot for the alternative coin for the smallest persona size
   */
  coinAlternativeForSmallestSize?: IPersonaCoinForSmallestSizeSlot;
}

export type PersonaCoinSize = 10 | 16 | 24 | 28 | 32 | 40 | 48 | 56 | 72 | 100;

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IPersonaCoinProps
  extends IPersonaCoinSlots,
    IStyleableComponentProps<IPersonaCoinProps, IPersonaCoinTokens, IPersonaCoinStyles> {
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
   * Alt text for the image to use. Defaults to an empty string.
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

  /**
   * Optional callback used to set a ref to the component
   */
  componentRef?: IRefObject<IPersonaCoinViewProps>;
}

export interface IPersonaCoinViewProps extends IPersonaCoinProps {
  isPictureLoaded?: boolean;
}

export interface IPersonaCoinTokens {}

export type IPersonaCoinStyles = IComponentStyles<IPersonaCoinSlots>;
