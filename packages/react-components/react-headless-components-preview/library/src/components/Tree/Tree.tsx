'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeProps } from './Tree.types';
import { useTree, useTreeContextValues } from './useTree';
import { renderTree } from './renderTree';

export const Tree: ForwardRefComponent<TreeProps> = React.forwardRef((props, ref) => {
  const state = useTree(props, ref);
  const contextValues = useTreeContextValues(state);
  return renderTree(state, contextValues);
});
Tree.displayName = 'Tree';
