import * as React from 'react';
import type { IImageProps } from '../Image/Image.types';
import type { IStyle, ITheme } from '../../Styling';
import type { IBaseProps, IStyleFunctionOrObject } from '../../Utilities';

/**
 * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
 * {@docCategory Icon}
 */
export enum IconType {
  /**
   * Render using the fabric icon font.
   * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
   */
  default = 0,

  /**
   * Render using an image, where imageProps would be used.
   * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
   */
  image = 1,

  /**
   * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
   */
  Default = 100000,

  /**
   * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
   */
  Image = 100001,
}

/**
 * {@docCategory Icon}
 */
export interface IIconProps extends IBaseProps, React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the icon to use from the icon font.
   * If string is empty, a placeholder icon will be rendered the same width as an icon.
   */
  iconName?: string;

  /**
   * The aria label of the icon for the benefit of screen readers.
   * @deprecated Use the native prop `aria-label`
   */
  ariaLabel?: string;

  /**
   * The type of icon to render (image or icon font).
   * @deprecated Inferred based on the presence of `imageProps`
   */
  // eslint-disable-next-line deprecation/deprecation
  iconType?: IconType;

  /**
   * If rendering an image icon, these props will be passed to the Image component.
   */
  imageProps?: IImageProps;

  /**
   * If rendering an image icon, this component will be rendered in the event that loading the image fails.
   */
  imageErrorAs?: React.ComponentType<IImageProps>;

  /**
   * Gets the styles for an Icon.
   */
  styles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
  theme?: ITheme;
}

/**
 * {@docCategory Icon}
 */
export interface IIconStyleProps {
  className?: string;
  iconClassName?: string;
  isPlaceholder: boolean;
  isImage: boolean;
  styles?: Partial<IIconStyles>;
  theme?: ITheme;
}

/**
 * {@docCategory Icon}
 */
export interface IIconStyles {
  root?: IStyle;

  /**
   * @deprecated Use `root`.
   */
  imageContainer?: IStyle;
}

/**
 * Props for a basic icon component which only supports font glyphs and can't be targeted by customizations.
 * {@docCategory Icon}
 */
export interface IFontIconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the icon to use from the icon font.
   * If string is empty, a placeholder icon will be rendered the same width as an icon.
   */
  iconName?: string;

  /**
   * Custom class to style the icon.
   */
  className?: string;
}

/**
 * Props for a basic image icon component which doesn't directly provide image load error handling
 * and can't be targeted by customizations.
 * {@docCategory Icon}
 */
export interface IImageIconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Props passed to the Image component.
   */
  imageProps: IImageProps;

  /**
   * Custom class to style the icon.
   */
  className?: string;
}
