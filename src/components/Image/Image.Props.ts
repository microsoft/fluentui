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
   * Function to call when the image indicated by src fails to load. The parameter src will be the same
   * as the original src property.
   */
  onError?: (src: string) => void;

  /**
   * Image source to display if an error occurs loading the image indicated by src.
   */
  errorSrc?: string;
}

