import * as React from 'react';
import { IconName } from './IconName';
import { IImageProps } from '../Image/Image.Props';
import { IStyle } from '../../Styling';

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

export interface IIconStyles {
  root?: IStyle;
  imageContainer?: IStyle;
}

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the icon to use from the icon font.
   *
   * @type {(IconName | string | null)}
   * @memberOf IIconProps
   */
  iconName?: IconName | string | null;

  /**
   * Optional styling for the elements within the Icon.
   */
  styles?: IIconStyles;

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
}