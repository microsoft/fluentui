import * as React from 'react';
import { useTree_unstable } from './useTree';
import { renderTree_unstable } from './renderTree';
import { useTreeStyles_unstable } from './useTreeStyles';
import type { TreeProps } from './Tree.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tree component provides a hierarchical list
 */
export const Tree: ForwardRefComponent<TreeProps> = React.forwardRef((props, ref) => {
  const state = useTree_unstable(props, ref);

  useTreeStyles_unstable(state);
  return renderTree_unstable(state);
});

Tree.displayName = 'Tree';
