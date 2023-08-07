import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FlatTreeProps } from './FlatTree.types';
import { useFlatTree_unstable } from './useFlatTree';
import { useFlatTreeStyles_unstable } from './useFlatTreeStyles.styles';
import { useFlatTreeContextValues_unstable } from './useFlatTreeContextValues';
import { renderFlatTree_unstable } from './renderFlatTree';

/**
 * The `FlatTree` component is a variation of the `Tree` component that deals with a flattened data structure.
 *
 * It should be used on cases where more complex interactions with a Tree is required.
 * On simple scenarios it is advised to simply use a nested structure instead.
 */
export const FlatTree: ForwardRefComponent<FlatTreeProps> = React.forwardRef((props, ref) => {
  const state = useFlatTree_unstable(props, ref);
  const contextValues = useFlatTreeContextValues_unstable(state);
  useFlatTreeStyles_unstable(state);
  return renderFlatTree_unstable(state, contextValues);
});

FlatTree.displayName = 'FlatTree';
