import { StatusProps } from '../Status/index';
import { ComponentProps, ShorthandValue } from '../temp/commonTypes';
import { ComposeOptions, ComposeStandardStatics } from '../temp/compose';

export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export interface AvatarProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Shorthand for the image. */
  image?: ShorthandValue<{}>;

  /** Shorthand for the label. */
  label?: ShorthandValue<{}>;

  /** Shorthand for the status of the user. */
  status?: ShorthandValue<StatusProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /** Size multiplier. */
  size?: SizeValue;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string) => string;

  /** Classes for the parts of the component */
  classes?: { [key: string]: string };
}

export interface AvatarSlots {
  image: React.ElementType;
  label: React.ElementType;
  status: React.ElementType;
}

export type AvatarSlotProps = {
  [key in keyof AvatarSlots]: AvatarProps[key];
};

export interface AvatarOptions
  extends ComposeOptions<AvatarProps, AvatarSlots, AvatarSlotProps, ComposeStandardStatics> {}
