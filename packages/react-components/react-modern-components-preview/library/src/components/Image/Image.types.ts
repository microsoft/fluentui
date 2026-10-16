import type {
  ImageProps as ImageBaseProps,
  ImageState as ImageBaseState,
} from '@fluentui/react-headless-components-preview/image';
export type { ImageSlots } from '@fluentui/react-headless-components-preview/image';

export type ImageProps = ImageBaseProps & {
  /**
   * Makes the image take up the width of its container.
   *
   * @default false
   */
  block?: boolean;

  /**
   * Adds a rectangular border around the image.
   *
   * @default false
   */
  bordered?: boolean;

  /**
   * Sets how the image should be resized to fit its container.
   *
   * @default 'default'
   */
  fit?: 'none' | 'center' | 'contain' | 'cover' | 'default';

  /**
   * Elevates the image with a shadow.
   *
   * @default false
   */
  shadow?: boolean;

  /**
   * Sets the shape of the image.
   *
   * @default 'square'
   */
  shape?: 'square' | 'circular' | 'rounded';
};

export type ImageState = ImageBaseState & {
  block: NonNullable<ImageProps['block']>;
  bordered: NonNullable<ImageProps['bordered']>;
  fit: NonNullable<ImageProps['fit']>;
  shadow: NonNullable<ImageProps['shadow']>;
  shape: NonNullable<ImageProps['shape']>;
  root: ImageBaseState['root'] & {
    'data-block'?: string;
    'data-bordered'?: string;
    'data-fit': NonNullable<ImageProps['fit']>;
    'data-fit-fill'?: string;
    'data-shadow'?: string;
    'data-shape': NonNullable<ImageProps['shape']>;
  };
};
