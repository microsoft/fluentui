'use client';

import { useSkeleton, useSkeletonContextValues } from './useSkeleton';
import { renderSkeleton } from './renderSkeleton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A skeleton component for loading placeholders.
 */
export const Skeleton = /*#__PURE__*/ composeComponent(
  'Skeleton',
  useSkeleton,
  renderSkeleton,
  useSkeletonContextValues,
);
