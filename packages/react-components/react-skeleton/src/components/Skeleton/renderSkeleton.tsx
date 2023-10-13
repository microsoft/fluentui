/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { SkeletonContextProvider } from '../../contexts/SkeletonContext';
import type { SkeletonContextValues, SkeletonSlots, SkeletonState } from './Skeleton.types';

/**
 * Render the final JSX of Skeleton
 */
export const renderSkeleton_unstable = (state: SkeletonState, contextValues: SkeletonContextValues) => {
  assertSlots<SkeletonSlots>(state);

  return (
    <SkeletonContextProvider value={contextValues.skeletonGroup}>
      <state.root />
    </SkeletonContextProvider>
  );
};
