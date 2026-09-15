'use client';

import * as React from 'react';

import type { SkeletonAnimation, SkeletonAppearance, SkeletonItemShape, SkeletonItemSize } from './Skeleton.types';

/** Group values a Skeleton publishes to the SkeletonItems below it. */
export type SkeletonContextValue = {
  animation?: SkeletonAnimation;
  appearance?: SkeletonAppearance;
  size?: SkeletonItemSize;
  shape?: SkeletonItemShape;
};

const SkeletonContext = React.createContext<SkeletonContextValue | undefined>(undefined);
const skeletonContextDefaultValue: SkeletonContextValue = {};

export const SkeletonContextProvider = SkeletonContext.Provider;

/**
 * The headless surface exports the provider half of the skeleton group context but not the
 * reader, so this module supplies one. It is internal — no barrel re-exports it.
 */
export const useSkeletonContext = (): SkeletonContextValue =>
  React.useContext(SkeletonContext) ?? skeletonContextDefaultValue;
