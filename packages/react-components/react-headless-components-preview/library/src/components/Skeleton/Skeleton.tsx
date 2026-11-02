'use client';

import type * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import type { SkeletonProps } from './Skeleton.types';
import { useSkeleton, useSkeletonContextValues } from './useSkeleton';
import { renderSkeleton } from './renderSkeleton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A skeleton component for loading placeholders.
 */
export const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & RefAttributes<HTMLDivElement>> =
  /*#__PURE__*/ composeComponent('Skeleton', useSkeleton, useSkeletonContextValues, renderSkeleton);
