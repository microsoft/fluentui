import * as React from 'react';
import type { ComponentPropsCompat } from '@fluentui/react-utilities';

export interface ImageProps extends ComponentPropsCompat, React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * An image can appear with rectangular border.
   */
  bordered?: boolean;

  /**
   * An image can set how it should be resized to fit its container.
   */
  fit?: 'none' | 'center' | 'contain' | 'cover';

  /**
   * An image can take up the width of its container.
   */
  fluid?: boolean;

  /**
   * An image can appear circular.
   */
  circular?: boolean;

  /**
   * An image can appear rounded.
   */
  rounded?: boolean;
}

export interface ImageState extends ImageProps {
  ref: React.RefObject<HTMLElement>;
}
