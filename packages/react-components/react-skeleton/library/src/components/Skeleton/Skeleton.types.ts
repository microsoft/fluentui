import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SkeletonContextValue } from '../../contexts/index';

export type SkeletonSlots = {
  /**
   * The root slot of the `Skeleton` is the container that will contain the slots that make up a `Skeleton`
   * and any data that the `Skeleton` will load. The default html element is a `div`.
   */
  root: NonNullable<Slot<'div', 'span'>>;
};

/**
 * Sizes for the SkeletonItem
 */
export type SkeletonItemSize =
  | 8
  | 12
  | 14
  | 16
  | 20
  | 22
  | 24
  | 28
  | 32
  | 36
  | 40
  | 48
  | 52
  | 56
  | 64
  | 72
  | 92
  | 96
  | 120
  | 128;

/**
 * Skeleton Props
 */
export type SkeletonProps = Omit<ComponentProps<Partial<SkeletonSlots>>, 'width'> & {
  /**
   * The animation type for the Skeleton
   * @defaultValue wave
   */
  animation?: 'wave' | 'pulse';

  /**
   * Sets the appearance of the Skeleton.
   * @defaultValue opaque
   */
  appearance?: 'opaque' | 'translucent';

  /**
   * Sets the width value of the skeleton wrapper.
   * @defaultValue 100%
   * @deprecated Use `className` prop to set width
   */
  width?: number | string;

  /**
   * Sets the size of the SkeletonItems inside the Skeleton in pixels.
   * Size is restricted to a limited set of values recommended for most uses (see SkeletonItemSize).
   * This value can be overridden by the individual SkeletonItem's `size` prop.
   */
  size?: SkeletonItemSize;

  /**
   * Sets the shape of the SkeletonItems inside the Skeleton.
   * This value can be overridden by the individual SkeletonItem's `shape` prop.
   */
  shape?: 'circle' | 'square' | 'rectangle';
};

export type SkeletonContextValues = {
  skeletonGroup: SkeletonContextValue;
};

/**
 * State used in rendering Skeleton
 */
export type SkeletonState = ComponentState<SkeletonSlots> &
  Required<Pick<SkeletonProps, 'animation' | 'appearance'>> &
  Pick<SkeletonProps, 'size' | 'shape'>;
