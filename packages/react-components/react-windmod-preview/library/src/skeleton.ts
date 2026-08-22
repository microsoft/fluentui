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

/** Headless building blocks, re-exported for consumers composing their own Skeleton. */
export {
  renderSkeleton,
  useSkeleton,
  useSkeletonContextValues,
} from '@fluentui/react-headless-components-preview/skeleton';
