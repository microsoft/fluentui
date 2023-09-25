import * as React from 'react';

const SkeletonContext = React.createContext<SkeletonContextValue | undefined>(undefined);

export interface SkeletonContextValue {
  animation?: 'wave' | 'pulse';
  appearance?: 'opaque' | 'translucent';
}

const skeletonContextDefaultValue: SkeletonContextValue = {};

export const SkeletonContextProvider = SkeletonContext.Provider;

export const useSkeletonContext = () => React.useContext(SkeletonContext) ?? skeletonContextDefaultValue;
