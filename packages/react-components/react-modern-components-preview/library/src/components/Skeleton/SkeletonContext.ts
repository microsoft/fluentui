'use client';

import * as React from 'react';
import type { SkeletonProps } from './Skeleton.types';

export type SkeletonVisualContextValue = Pick<SkeletonProps, 'animation' | 'appearance' | 'size' | 'shape'>;

const SkeletonVisualContext = React.createContext<SkeletonVisualContextValue | undefined>(undefined);

export const SkeletonVisualContextProvider = SkeletonVisualContext.Provider;
export const useSkeletonVisualContext = (): SkeletonVisualContextValue => React.useContext(SkeletonVisualContext) ?? {};
