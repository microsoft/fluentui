/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { SkeletonItemBaseState, SkeletonItemSlots } from './SkeletonItem.types';

/**
 * Render the final JSX of SkeletonItem
 */
export const renderSkeletonItem_unstable = (state: SkeletonItemBaseState): JSXElement => {
  assertSlots<SkeletonItemSlots>(state);

  return <state.root />;
};
