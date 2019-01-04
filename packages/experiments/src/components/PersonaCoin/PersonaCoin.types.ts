import { ImageLoadState, PersonaPresence, IStyle } from 'office-ui-fabric-react';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type IPersonaCoinComponent = IStatelessComponent<IPersonaCoinProps, IPersonaCoinStyles>;

export type PersonaCoinSize = 10 | 16 | 24 | 28 | 32 | 40 | 48 | 56 | 72 | 100;

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IPersonaCoinProps extends IStyleableComponentProps<IPersonaCoinProps, IPersonaCoinStyles> {
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
   * The user's initials to display in the image area when there is no image.
   * This property can be used instead of `text` to force the initials.
   */
  initials?: string;

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
   * Presence of the person to display - will not display presence if undefined.
   * @defaultvalue PersonaPresence.none
   */
  presence?: PersonaPresence;
}

export interface IPersonaCoinStyles {
  /**
   * Styling for the root element.
   */
  root: IStyle;

  /**
   * Styling for the image element
   */
  image: IStyle;

  /**
   * Styling for the initials element
   */
  initials: IStyle;

  /**
   * Styling for the presence element
   */
  presence: IStyle;
}
