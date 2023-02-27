import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonItemSlots = {
  root: Slot<'div'>;
};

/**
 * Sizes for the SkeletonItem
 */
export type SkeletonItemSize = 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

/**
 * SkeletonItem Props
 */
export type SkeletonItemProps = ComponentProps<SkeletonItemSlots> & {
  /**
   * Sets the animation of the SkeletonItem
   * @default wave
   */
  animation?: 'wave' | 'pulse';

  /**
   * Sets the appearance of the SkeletonItem
   * @default opaque
   */
  appearance?: 'opaque' | 'translucent';

  /**
   * Sets the size of the SkeletonItem in pixels.
   * Size is restricted to a limited set of values recommended for most uses(see SkeletonItemSize).
   * To set a non-supported size, set `size` to the next-smaller supported size, and set `width` and `height`
   * to override the rendered size.
   *
   * For example, to set the SkeletonItem to 45px in size:
   * \<SkeletonItem size=\{40\} style=\{\{ width: '45px', height: '45px' \}\} \/\>
   * @default 16
   */
  size?: SkeletonItemSize;

  /**
   * Sets the shape of the SkeletonItem.
   * @default rectangle
   */
  shape?: 'circle' | 'square' | 'rectangle';
};

/**
 * State used in rendering SkeletonItem
 */
export type SkeletonItemState = ComponentState<SkeletonItemSlots> &
  Required<Pick<SkeletonItemProps, 'animation' | 'appearance' | 'size' | 'shape'>>;
