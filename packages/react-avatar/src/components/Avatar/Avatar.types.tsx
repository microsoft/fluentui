import { BadgeProps } from '../Badge/index';
import { ComponentProps, ShorthandValue } from '../utils/commonTypes';

/**
 * Sizes for the Avatar
 *
 * This is a restricted list based on design guidelines for the Avatar control.
 *
 * It's recommended to use one of these sizes to conform to the design guidelines;
 * however, it is possible to specify a different value using the `size` token. E.g.:
 * `tokens={{ size: '52px' }}`
 */
export type NumericSizeValue = 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 128;

/**
 * Style tokens for the Avatar
 */
export type AvatarTokens = {
  /** Size of the avatar.
   * @defaultvalue The Avatar's `size` prop */
  size?: string;

  /** Background fill when there is no image */
  fill?: string;

  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: string;
  /** Border radius */
  borderRadius?: string;
  /** Border radius when the Avatar is square */
  squareBorderRadius?: string;

  /** Font size used by the initials */
  fontSize?: string;

  /** Tokens for the badge slot (state indicator) */
  badge?: {
    borderColor?: string;
    borderWidth?: string;
  };
};

export interface AvatarProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Shorthand for the image. */
  image?: ShorthandValue<{}>;

  /** Shorthand for the label. */
  label?: ShorthandValue<{}>;

  /** Shorthand for the badge of the user. */
  badge?: ShorthandValue<BadgeProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /** Size of the avatar */
  size?: NumericSizeValue;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string, isRtl: boolean) => string;

  /** Classes for the parts of the component */
  classes?: { [key: string]: string };

  /** Style tokens */
  tokens?: AvatarTokens;
}

export type AvatarState = AvatarProps;
