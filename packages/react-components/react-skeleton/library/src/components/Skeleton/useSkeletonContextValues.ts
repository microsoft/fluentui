import * as React from 'react';
import type { SkeletonContextValues, SkeletonState } from '../Skeleton';

export const useSkeletonContextValues = (state: SkeletonState): SkeletonContextValues => {
  const { animation, appearance } = state;

  const skeletonGroup = React.useMemo(
    () => ({
      animation,
      appearance,
    }),
    [animation, appearance],
  );

  return { skeletonGroup };
};
