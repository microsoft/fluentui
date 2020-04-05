export interface IAvatar {}

export interface IShorthandValue<TProps> {}

export interface IImageProps {}
export interface ILabelProps {}
export interface IStatusProps {}
export type ISizeValue = '';

export interface IAvatarProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @deprecated;
   */
  //accessibility?: Accessibility<never>;

  /** Shorthand for the image. */
  image?: IShorthandValue<IImageProps>;

  /** Shorthand for the label. */
  label?: IShorthandValue<ILabelProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /** Size multiplier. */
  size?: ISizeValue;

  /** Shorthand for the status of the user. */
  status?: IShorthandValue<IStatusProps>;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string) => string;

  classes?: { [key: string]: string };
}
