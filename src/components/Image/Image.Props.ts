import * as React from 'react';

export interface IImageProps extends React.HTMLProps<HTMLImageElement>  {
  /**
   * If true, adds the css class 'is-fadeIn' to the image.
   */
  shouldFadeIn?: boolean;

  /**
   * If provided, adds the indicated css class to the image.
   */
  className?: string;

  /**
   * Used to determine how to size the image to fit the dimensions of the component.
   * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
   * @default See description
   */
  imageFit?: ImageFit;

  /**
   * Image source to display if an error occurs loading the image indicated by src.
   */
  errorSrc?: string;
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
   * The image is sized to maintain its aspect ratio while filling the element’s entire content box.
   */
  cover,

  /**
   * The image is scaled to match the size of the element's content box.
   */
  scale,

  /**
   * The image is not resized.
   */
  none
}
