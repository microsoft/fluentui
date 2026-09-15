import type {
  SkeletonProps as SkeletonHeadlessProps,
  SkeletonState as SkeletonHeadlessState,
} from '@fluentui/react-headless-components-preview/skeleton';

export type { SkeletonSlots } from '@fluentui/react-headless-components-preview/skeleton';

/** Animation of a Skeleton and the items it groups. `'wave'` is the base look. */
export type SkeletonAnimation = 'wave' | 'pulse';

/** Visual style of a Skeleton and the items it groups. `'opaque'` is the base look. */
export type SkeletonAppearance = 'opaque' | 'translucent';

/** Shape of a SkeletonItem. `'rectangle'` is the base look. */
export type SkeletonItemShape = 'circle' | 'rectangle' | 'square';

/** Pixel size of a SkeletonItem, restricted to the recommended set. */
export type SkeletonItemSize = NonNullable<SkeletonHeadlessProps['size']>;

/**
 * Windmod Skeleton props: the headless skeleton plus the look props the headless surface
 * deliberately omits (they exist purely to select styles). `size` and `shape` are already on
 * the headless props — they are group values read by SkeletonItem, not styles of the group.
 */
export type SkeletonProps = SkeletonHeadlessProps & {
  /** @default 'wave' */
  animation?: SkeletonAnimation;
  /** @default 'opaque' */
  appearance?: SkeletonAppearance;
};

/** Windmod Skeleton state: headless state plus the resolved look props and the group values. */
export type SkeletonState = SkeletonHeadlessState &
  Required<Pick<SkeletonProps, 'animation' | 'appearance'>> &
  Pick<SkeletonProps, 'shape' | 'size'>;
