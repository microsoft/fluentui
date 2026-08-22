import type {
  SkeletonItemProps as SkeletonItemHeadlessProps,
  SkeletonItemState as SkeletonItemHeadlessState,
} from '@fluentui/react-headless-components-preview/skeleton';

import type { SkeletonAnimation, SkeletonAppearance, SkeletonItemShape, SkeletonItemSize } from '../Skeleton.types';

export type { SkeletonItemSlots } from '@fluentui/react-headless-components-preview/skeleton';

/**
 * Windmod SkeletonItem props: the headless skeleton item plus the look props the headless
 * surface deliberately omits (they exist purely to select styles).
 */
export type SkeletonItemProps = SkeletonItemHeadlessProps & {
  /** @default 'wave' */
  animation?: SkeletonAnimation;
  /** @default 'opaque' */
  appearance?: SkeletonAppearance;
  /** @default 'rectangle' */
  shape?: SkeletonItemShape;
  /** @default 16 */
  size?: SkeletonItemSize;
};

/** Windmod SkeletonItem state: headless state plus the resolved look props. */
export type SkeletonItemState = SkeletonItemHeadlessState &
  Required<Pick<SkeletonItemProps, 'animation' | 'appearance' | 'shape' | 'size'>>;
