'use client';

import * as React from 'react';
import type { SkeletonItemSize } from '../components/SkeletonItem/SkeletonItem.types';

const SkeletonContext = React.createContext<SkeletonContextValue | undefined>(undefined);

export interface SkeletonContextValue {
  animation?: 'wave' | 'pulse';
  appearance?: 'opaque' | 'translucent';
  size?: SkeletonItemSize;
  shape?: 'circle' | 'square' | 'rectangle';
}

const skeletonContextDefaultValue: SkeletonContextValue = {};

export const SkeletonContextProvider = SkeletonContext.Provider;

export const useSkeletonContext = (): SkeletonContextValue =>
  React.useContext(SkeletonContext) ?? skeletonContextDefaultValue;
