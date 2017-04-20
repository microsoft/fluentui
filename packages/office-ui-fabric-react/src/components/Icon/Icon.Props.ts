import * as React from 'react';
import { IconName } from './IconName';
import { IImageProps } from '../Image/Image.Props';

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

export interface IIconProps extends React.HTMLProps<HTMLElement> {
  /**
   * The name of the icon to use from the icon font.
   *
   * @type {(IconName | string | null)}
   * @memberOf IIconProps
   */
  iconName?: IconName | string | null;

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