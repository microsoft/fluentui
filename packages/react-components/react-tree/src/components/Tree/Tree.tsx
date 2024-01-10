import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTree_unstable } from './useTree';
import type { TreeProps } from './Tree.types';
import { useTreeContextValues_unstable } from './useTreeContextValues';
import { useTreeStyles_unstable } from './useTreeStyles.styles';
import { renderTree_unstable } from './renderTree';

/**
 * The `Tree` component renders nested items in a hierarchical structure.
 * Use it with `TreeItem` component and layouts components `TreeItemLayout` or `TreeItemPersonaLayout`.
 */
export const Tree: ForwardRefComponent<TreeProps> = React.forwardRef((props, ref) => {
  const state = useTree_unstable(props, ref);
  const contextValues = useTreeContextValues_unstable(state);
  useTreeStyles_unstable(state);
  return renderTree_unstable(state, contextValues);
});

Tree.displayName = 'Tree';
