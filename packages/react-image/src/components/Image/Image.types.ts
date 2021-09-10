import * as React from 'react';
import type { ComponentState, ComponentProps, ObjectShorthandProps } from '@fluentui/react-utilities';

export type ImageSlots = {
  root: ObjectShorthandProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement, 'img'>;
};

export type ImageCommons = {
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
};

export interface ImageProps extends ComponentProps<ImageSlots>, Partial<ImageCommons> {}

export interface ImageState extends ComponentState<ImageSlots>, ImageCommons {}
