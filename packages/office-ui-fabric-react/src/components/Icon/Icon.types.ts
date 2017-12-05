import * as React from 'react';
import { IImageProps } from '../Image/Image.types';
import { IStyle } from '../../Styling';
import { IComponentAs, IStyleFunction } from '../../Utilities';

// Please keep alphabetized
export enum IconType {

  /**
   * Render using the fabric icon font.
   */
  default = 0,

  /**
   * Render using an image, where imageProps would be used.
   */
  image = 1
}

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render the root element as another type.
   */
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;

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
   * Gets icon styles.
   */
  getStyles?: IStyleFunction<IIconStyleProps, IIconStyles>;
}

export interface IIconStyleProps {
  className?: string;
  subsetClassName?: string;
  isImage: boolean;
  isPlaceholder: boolean;
}

export interface IIconStyles {
  root: IStyle;
}
