import type { ComponentState, ComponentProps, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type ImageSlots = {
  root: IntrinsicShorthandProps<'img'>;
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

export type ImageProps = ComponentProps<ImageSlots> & Partial<ImageCommons>;

export type ImageState = ComponentState<ImageSlots> & ImageCommons;
