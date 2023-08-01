import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FlatTreeProps } from './FlatTree.types';
import {
  useTreeContextValues_unstable as useFlatTreeContextValues_unstable,
  renderTree_unstable as renderFlatTree_unstable,
} from '../Tree/index';
import { useFlatTree_unstable } from './useFlatTree';
import { useFlatTreeStyles_unstable } from './useFlatTreeStyles.styles';

/**
 * FlatTree component - TODO: add more docs
 */
export const FlatTree: ForwardRefComponent<FlatTreeProps> = React.forwardRef((props, ref) => {
  const state = useFlatTree_unstable(props, ref);
  const contextValues = useFlatTreeContextValues_unstable(state);
  useFlatTreeStyles_unstable(state);
  return renderFlatTree_unstable(state, contextValues);
});

FlatTree.displayName = 'FlatTree';
