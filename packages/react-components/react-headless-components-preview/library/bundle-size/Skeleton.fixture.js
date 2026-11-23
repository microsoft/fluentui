// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Skeleton,
  SkeletonItem,
  renderSkeleton,
  renderSkeletonItem,
  useSkeleton,
  useSkeletonContext,
  useSkeletonContextValues,
  useSkeletonItem,
} from '@fluentui/react-headless-components-preview/skeleton';

console.log(
  Skeleton,
  SkeletonItem,
  renderSkeleton,
  renderSkeletonItem,
  useSkeleton,
  useSkeletonContext,
  useSkeletonContextValues,
  useSkeletonItem,
);

export default {
  name: '@fluentui/react-headless-components-preview/skeleton',
};
