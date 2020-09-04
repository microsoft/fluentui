import { BaseSlots, ComponentProps, SlotProps } from '@fluentui/react-compose';
import * as React from 'react';

export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {
  /** An alternative text for an image. */
  alt?: string;

  /** An image can appear with rectangular border. */
  bordered?: boolean;

  /** An image can set how it should be resized to fit its container. */
  fit?: 'none' | 'center' | 'contain' | 'cover';

  /** An image can take up the width of its container. */
  fluid?: boolean;

  /** An image can appear circular. */
  circular?: boolean;

  /** An image can appear rounded. */
  rounded?: boolean;

  /** An image can have source URL. */
  src?: string;
}

export interface ImageState extends ImageProps {
  imageRef?: React.RefObject<HTMLElement>;
}

export interface ImageSlots extends BaseSlots {}

export type ImageSlotProps = SlotProps<ImageSlots, ImageProps, React.ImgHTMLAttributes<HTMLImageElement>>;
