import * as React from 'react';
import { Image } from './Image';

export interface IImageProps extends React.Props<Image> {

   /**
   * Image source to display.
   */
  src: string;

   /**
   * Alt text to put on the image.
   */
  alt?: string;

   /**
   * If provided, forces the image to be this width.
   */
  width?: number;

  /**
   * If provided, forces the image to be this height.
   */
  height?: number;

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
   * @default none
   */
  imageFit?: ImageFit;

  /**
   * Function to call when the image indicated by src fails to load. The parameter src will be the same
   * as the original src property.
   */
  onError?: (src: string) => void;

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
   * The image is not resized. The default sizing algorithm is used.
   */
  none
}
