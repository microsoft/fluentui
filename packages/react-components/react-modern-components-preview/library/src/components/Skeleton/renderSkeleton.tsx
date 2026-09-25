import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { renderSkeleton as renderSkeletonBase } from '@fluentui/react-headless-components-preview/skeleton';
import { SkeletonVisualContextProvider } from './SkeletonContext';
import type { SkeletonState } from './Skeleton.types';
import type { SkeletonContextValues } from './useSkeleton';

export const renderSkeleton = (state: SkeletonState, contextValues: SkeletonContextValues): JSXElement => (
  <SkeletonVisualContextProvider value={contextValues.modernSkeleton}>
    {renderSkeletonBase(state, contextValues)}
  </SkeletonVisualContextProvider>
);
