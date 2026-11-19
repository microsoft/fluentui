import type {
  ImageProps as ImageHeadlessProps,
  ImageState as ImageHeadlessState,
} from '@fluentui/react-headless-components-preview/image';

export type { ImageSlots } from '@fluentui/react-headless-components-preview/image';

/** How an Image is resized to fit its container. `'default'` is the base look. */
export type ImageFit = 'none' | 'center' | 'contain' | 'cover' | 'default';

/** Corner treatment of the Image. `'square'` is the base look. */
export type ImageShape = 'square' | 'circular' | 'rounded';

/**
 * Windmod Image props: the headless image plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type ImageProps = ImageHeadlessProps & {
  /** @default false */
  block?: boolean;
  /** @default false */
  bordered?: boolean;
  /** @default 'default' */
  fit?: ImageFit;
  /** @default false */
  shadow?: boolean;
  /** @default 'square' */
  shape?: ImageShape;
};

/** Windmod Image state: headless state plus the resolved look props. */
export type ImageState = ImageHeadlessState &
  Required<Pick<ImageProps, 'block' | 'bordered' | 'fit' | 'shadow' | 'shape'>>;
