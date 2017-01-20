import * as React from 'react';

export interface IImageProps extends React.HTMLProps<HTMLImageElement> {
  /**
   * If true, adds the css class 'is-fadeIn' to the image.
   */
  shouldFadeIn?: boolean;

  /**
   * If provided, adds the indicated css class to the image.
   */
  className?: string;

  /**
   * Used to determine how the image is scaled and cropped to fit the frame.
   *
   * @default If both dimensions are provided, then the image is fit using ImageFit.scale. Otherwise, the image won't be scaled or cropped.
   */
  imageFit?: ImageFit;

  /**
   * Image source to display if an error occurs loading the image indicated by src.
   */
  errorSrc?: string;

  /**
   * If true, the image frame will expand to fill its parent container.
   */
  maximizeFrame?: boolean;

  /**
   * Optional callback method for when the image load state has changes
   * The 'loadState' parameter indicates the current state of the Image
   */
  onLoadingStateChange?: (loadState: ImageLoadState) => void;
}

/**
 * The possible methods that can be used to fit the image.
 */
export enum ImageFit {
  /**
   * The image is not scaled. The image is centered and cropped within the content box.
   */
  center,

  /**
   * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
   * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
   * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
   */
  contain,

  /**
   * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
   * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
   */
  cover,

  /**
   * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
   * frame will have empty space.
   */
  none
}

export enum ImageLoadState {
  /**
   * The image has not yet been loaded, and there is no error yet.
   */
  notLoaded,

  /**
   * The image has been loaded successfully.
   */
  loaded,

  /**
   * An error has been encountered while loading the image.
   */
  error,

  /**
   * The image was not successfully loaded due to an error.
   */
  errorLoaded
}
