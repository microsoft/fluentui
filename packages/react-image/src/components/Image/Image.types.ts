import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type ImageSlots = {
  root: Slot<'img'>;
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
  block?: boolean;

  /**
   * An image can appear square, circular, or rounded.
   * @defaultvalue square
   */
  shape?: 'square' | 'circular' | 'rounded';

  /**
   * An image can appear elevated with shadow.
   */
  shadow?: boolean;
};

export type ImageProps = ComponentProps<ImageSlots> & Partial<ImageCommons>;

export type ImageState = ComponentState<ImageSlots> & ImageCommons;
