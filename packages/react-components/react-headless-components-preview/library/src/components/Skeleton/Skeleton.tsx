'use client';

import type { ForwardRefComponent, RefAttributes } from '@fluentui/react-utilities';
import type { SkeletonProps } from './Skeleton.types';
import { useSkeleton, useSkeletonContextValues } from './useSkeleton';
import { renderSkeleton } from './renderSkeleton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A skeleton component for loading placeholders.
 */
export const Skeleton: ForwardRefComponent<SkeletonProps & RefAttributes<HTMLDivElement>> =
  /*#__PURE__*/ composeComponent('Skeleton', useSkeleton, useSkeletonContextValues, renderSkeleton);
