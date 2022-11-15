import * as React from 'react';
import { useTreeLeaf_unstable } from './useTreeLeaf';
import { renderTreeLeaf_unstable } from './renderTreeLeaf';
import { useTreeLeafStyles_unstable } from './useTreeLeafStyles';
import type { TreeLeafProps } from './TreeLeaf.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tree leaf component are the items in the tree component and its branches
 */
export const TreeLeaf: ForwardRefComponent<TreeLeafProps> = React.forwardRef((props, ref) => {
  const state = useTreeLeaf_unstable(props, ref);

  useTreeLeafStyles_unstable(state);
  return renderTreeLeaf_unstable(state);
});

TreeLeaf.displayName = 'TreeLeaf';
