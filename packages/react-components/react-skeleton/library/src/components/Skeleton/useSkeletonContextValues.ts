'use client';

import * as React from 'react';
import type { SkeletonContextValues, SkeletonState } from '../Skeleton';

export const useSkeletonContextValues = (state: SkeletonState): SkeletonContextValues => {
  const { animation, appearance, size, shape } = state;

  const skeletonGroup = React.useMemo(
    () => ({
      animation,
      appearance,
      size,
      shape,
    }),
    [animation, appearance, size, shape],
  );

  return { skeletonGroup };
};
