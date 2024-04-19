import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type ImageSlots = {
  root: Slot<'img'>;
};

export type ImageProps = ComponentProps<ImageSlots> & {
  /**
   * An image can take up the width of its container.
   *
   * @default false
   */
  block?: boolean;

  /**
   * An image can appear with a rectangular border.
   *
   * @default false
   */
  bordered?: boolean;

  /**
   * An image can set how it should be resized to fit its container.
   *
   * @default 'default'
   */
  fit?: 'none' | 'center' | 'contain' | 'cover' | 'default';

  /**
   * An image can appear elevated with shadow.
   *
   * @default false
   */
  shadow?: boolean;

  /**
   * An image can appear square, circular, or rounded.
   *
   * @default 'square'
   */
  shape?: 'square' | 'circular' | 'rounded';
};

export type ImageState = ComponentState<ImageSlots> &
  Required<Pick<ImageProps, 'block' | 'bordered' | 'fit' | 'shadow' | 'shape'>>;
