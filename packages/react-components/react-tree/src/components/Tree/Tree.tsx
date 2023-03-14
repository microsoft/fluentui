import * as React from 'react';
import { useTree_unstable } from './useTree';
import { renderTree_unstable } from './renderTree';
import { useTreeStyles_unstable } from './useTreeStyles';
import type { TreeProps } from './Tree.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTreeContextValues_unstable } from './useTreeContextValues';

/**
 * A tree view widget presents a hierarchical list.
 * Any item in the hierarchy may have child items,
 * and items that have children may be expanded or collapsed to show or hide the children.
 * For example, in a file system navigator that uses a tree view to display folders and files,
 * an item representing a folder can be expanded to reveal the contents of the folder,
 * which may be files, folders, or both.
 */
export const Tree: ForwardRefComponent<TreeProps> = React.forwardRef((props, ref) => {
  const state = useTree_unstable(props, ref);
  useTreeStyles_unstable(state);
  const contextValues = useTreeContextValues_unstable(state);
  return renderTree_unstable(state, contextValues);
});

Tree.displayName = 'Tree';
