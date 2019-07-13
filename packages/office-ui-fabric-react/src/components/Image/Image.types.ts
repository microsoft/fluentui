import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Image}
 */
export interface IImage {}

/**
 * {@docCategory Image}
 */
export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IImageStyleProps, IImageStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Component
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * If true, fades the image in when loaded.
   * @defaultvalue true
   */
  shouldFadeIn?: boolean;

  /**
   * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
   * it is successfully loaded. This disables shouldFadeIn.
   * @defaultvalue false;
   */
  shouldStartVisible?: boolean;

  /**
   * Used to determine how the image is scaled and cropped to fit the frame.
   *
   * @defaultvalue If both dimensions are provided, then the image is fit using ImageFit.scale.
   * Otherwise, the image won't be scaled or cropped.
   */
  imageFit?: ImageFit;

  /**
   * Deprecated at v1.3.6, to replace the src in case of errors, use `onLoadingStateChange` instead and
   * rerender the Image with a difference src.
   * @deprecated Use `onLoadingStateChange` instead and
   * rerender the Image with a difference src.
   */
  errorSrc?: string;

  /**
   * If true, the image frame will expand to fill its parent container.
   */
  maximizeFrame?: boolean;

  /**
   * Optional callback method for when the image load state has changed.
   * The 'loadState' parameter indicates the current state of the Image.
   */
  onLoadingStateChange?: (loadState: ImageLoadState) => void;

  /**
   * Specifies the cover style to be used for this image. If not
   * specified, this will be dynamically calculated based on the
   * aspect ratio for the image.
   */
  coverStyle?: ImageCoverStyle;
}

/**
 * The possible methods that can be used to fit the image.
 * {@docCategory Image}
 */
export enum ImageFit {
  /**
   * The image is not scaled. The image is centered and cropped within the content box.
   */
  center = 0,

  /**
   * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
   * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
   * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
   */
  contain = 1,

  /**
   * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
   * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
   */
  cover = 2,

  /**
   * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
   * frame will have empty space.
   */
  none = 3,

  /**
   * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
   * behave as ImageFit.center if the image's natural height or width is less than the Image frame's height or width,
   * but if both natural height and width are larger than the frame it will behave as ImageFit.cover.
   */
  centerCover = 4,

  /**
   * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
   * behave as ImageFit.center if the image's natural height and width is less than the Image frame's height and width,
   * but if either natural height or width are larger than the frame it will behave as ImageFit.contain.
   */
  centerContain = 5
}

/**
 * The cover style to be used on the image
 * {@docCategory Image}
 */
export enum ImageCoverStyle {
  /**
   * The image will be shown at 100% height of container and the width will be scaled accordingly
   */
  landscape = 0,

  /**
   * The image will be shown at 100% width of container and the height will be scaled accordingly
   */
  portrait = 1
}

/**
 * {@docCategory Image}
 */
export enum ImageLoadState {
  /**
   * The image has not yet been loaded, and there is no error yet.
   */
  notLoaded = 0,

  /**
   * The image has been loaded successfully.
   */
  loaded = 1,

  /**
   * An error has been encountered while loading the image.
   */
  error = 2,

  /**
   * Deprecated at v1.3.6, to replace the src in case of errors, use `onLoadingStateChange` instead
   * and rerender the Image with a difference src.
   * @deprecated Use `onLoadingStateChange` instead
   * and rerender the Image with a difference src.
   */
  errorLoaded = 3
}

/**
 * {@docCategory Image}
 */
export interface IImageStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * If true, the image frame will expand to fill its parent container.
   */
  maximizeFrame?: boolean;

  /**
   * If true, the image is loaded
   */
  isLoaded?: boolean;

  /**
   * If true, fades the image in when loaded.
   * @defaultvalue true
   */
  shouldFadeIn?: boolean;

  /**
   * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
   * it is successfully loaded. This disables shouldFadeIn.
   * @defaultvalue false;
   */
  shouldStartVisible?: boolean;

  /**
   * If true the image is coverStyle landscape instead of portrait
   */
  isLandscape?: boolean;

  /**
   * ImageFit booleans for center, cover, contain, centerContain, centerCover, none
   */
  isCenter?: boolean;
  isContain?: boolean;
  isCover?: boolean;
  isCenterContain?: boolean;
  isCenterCover?: boolean;
  isNone?: boolean;

  /**
   * if true image load is in error
   */
  isError?: boolean;

  /**
   * if true, imageFit is undefined
   */
  isNotImageFit?: boolean;

  /**
   * Image width value
   */
  width?: number | string;

  /**
   * Image height value
   */
  height?: number | string;
}

/**
 * {@docCategory Image}
 */
export interface IImageStyles {
  /**
   * Style set for the root div element.
   */
  root: IStyle;
  /**
   * Style set for the img element.
   */
  image: IStyle;
}
