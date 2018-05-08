import * as React from 'react';
import { IImageProps } from '../Image/Image.types';
import { IStyle } from '../../Styling';
import { IBaseProps, IStyleFunction } from '../../Utilities';

// Please keep alphabetized
export enum IconType {

  /**
   * Render using the fabric icon font.
   */
  default = 0,

  /**
   * Render using an image, where imageProps would be used.
   */
  image = 1,

  /**
   * Deprecated, use default.
   * @deprecated
   */
  Default = 100000,

  /**
   * Deprecated, use image.
   * @deprecated
   */
  Image = 100001
}

export interface IIconProps extends IBaseProps, React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the icon to use from the icon font. If string is empty, a placeholder icon will be rendered the same width as an icon
   */
  iconName?: string;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * The type of icon to render (image or icon font).
   *
   * @type {IconType}
   * @memberOf IIconProps
   */
  iconType?: IconType;

  /**
   * If rendering an image icon, these props will be passed to the Image component.
   *
   * @type {IImageProps}
   * @memberOf IIconProps
   */
  imageProps?: IImageProps;

  /**
   * If rendering an image icon, this function callback will be invoked in the event loading the image errors.
   */
  imageErrorAs?: React.StatelessComponent<IImageProps> | React.ComponentClass<IImageProps>;

  /**
   * Gets the styles for an Icon.
   */
  getStyles?: IStyleFunction<IIconStyleProps, IIconStyles>;

  /**
   * Deprecated: use getStyles.
   * @deprecated
   */
  styles?: IIconStyles;
}

export interface IIconStyleProps {
  className?: string;
  iconClassName?: string;
  isPlaceholder: boolean;
  isImage: boolean;
  styles?: Partial<IIconStyles>;
}

export interface IIconStyles {
  root?: IStyle;

  /**
   * Deprecated. Use 'root'.
   * @deprecated
   */
  imageContainer?: IStyle;
}
