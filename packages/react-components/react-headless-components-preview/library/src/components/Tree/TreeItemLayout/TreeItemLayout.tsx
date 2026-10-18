'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemLayoutProps } from './TreeItemLayout.types';
import { useTreeItemLayout } from './useTreeItemLayout';
import { renderTreeItemLayout } from './renderTreeItemLayout';

/**
 * Lays out the content of a `TreeItem`: an expand icon, a selector, icons, the main content, and
 * aside content or actions.
 *
 * Must be rendered inside a `TreeItem`. When the tree is selectable the `selector` slot renders a native
 * `input[type="checkbox"]` or `input[type="radio"]`, labelled by the main content. The `expandIcon` slot
 * has no default content.
 */
export const TreeItemLayout: ForwardRefComponent<TreeItemLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemLayout(props, ref);

  return renderTreeItemLayout(state);
});

TreeItemLayout.displayName = 'TreeItemLayout';
