export { Skeleton, skeletonClassNames, useSkeletonStyles } from './components/Skeleton';
export type {
  SkeletonAnimation,
  SkeletonAppearance,
  SkeletonItemShape,
  SkeletonItemSize,
  SkeletonProps,
  SkeletonSlots,
  SkeletonState,
} from './components/Skeleton';

export { SkeletonItem, skeletonItemClassNames, useSkeletonItemStyles } from './components/SkeletonItem';
export type { SkeletonItemProps, SkeletonItemSlots, SkeletonItemState } from './components/SkeletonItem';

/** Headless building blocks, re-exported for consumers composing their own Skeleton. */
export {
  renderSkeleton,
  renderSkeletonItem,
  useSkeleton,
  useSkeletonContextValues,
  useSkeletonItem,
} from '@fluentui/react-headless-components-preview/skeleton';

export { useSkeletonContext } from '@fluentui/react-headless-components-preview/skeleton';

export type { SkeletonContextValue, SkeletonContextValues } from '@fluentui/react-headless-components-preview/skeleton';
