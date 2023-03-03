import * as React from 'react';

const SkeletonContext = React.createContext<SkeletonContextValue | undefined>(undefined);

export interface SkeletonContextValue {
  animation?: 'wave' | 'pulse';
  appearance?: 'opaque' | 'translucent';
}

const skeletonContextDefaultValue: SkeletonContextValue = {};

export const SkeletonContextProvider = skeletonContext.Provider;

export const useSkeletonContext = () => React.useContext(skeletonContext) ?? skeletonContextDefaultValue;
