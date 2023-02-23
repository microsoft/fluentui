import { SkeletonContextValue, SkeletonContextValues, SkeletonState } from '../Skeleton';

export const useSkeletonContextValues = (state: SkeletonState): SkeletonContextValues => {
  const { animation, appearance } = state;

  const skeletonGroup: SkeletonContextValue = {
    animation,
    appearance,
  };

  return { skeletonGroup };
};
