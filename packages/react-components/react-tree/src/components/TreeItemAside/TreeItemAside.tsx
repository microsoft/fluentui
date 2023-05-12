import * as React from 'react';
import { useTreeItemAside_unstable } from './useTreeItemAside';
import { renderTreeItemAside_unstable } from './renderTreeItemAside';
import { useTreeItemAsideStyles_unstable } from './useTreeItemAsideStyles.styles';
import type { TreeItemAsideProps } from './TreeItemAside.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TreeItemAside component - represents a custom set of actionable elements that will be visible when a certain
 * `TreeItem` is currently "active".
 */
export const TreeItemAside: ForwardRefComponent<TreeItemAsideProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemAside_unstable(props, ref);

  useTreeItemAsideStyles_unstable(state);
  return renderTreeItemAside_unstable(state);
});

TreeItemAside.displayName = 'TreeItemAside';
