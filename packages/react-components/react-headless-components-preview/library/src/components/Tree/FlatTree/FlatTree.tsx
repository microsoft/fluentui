'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FlatTreeProps } from './FlatTree.types';
import { useFlatTree, useFlatTreeContextValues } from './useFlatTree';
import { renderFlatTree } from './renderFlatTree';

export const FlatTree: ForwardRefComponent<FlatTreeProps> = React.forwardRef((props, ref) => {
  const state = useFlatTree(props, ref);
  const contextValues = useFlatTreeContextValues(state);
  return renderFlatTree(state, contextValues);
});
FlatTree.displayName = 'FlatTree';
