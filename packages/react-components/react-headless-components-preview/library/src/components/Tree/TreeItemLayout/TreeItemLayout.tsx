'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemLayoutProps } from './TreeItemLayout.types';
import { useTreeItemLayout } from './useTreeItemLayout';
import { renderTreeItemLayout } from './renderTreeItemLayout';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Lays out the content of a `TreeItem`: an expand icon, a selector, icons, the main content, and
 * aside content or actions.
 *
 * Must be rendered inside a `TreeItem`. When the tree is selectable the `selector` slot renders a native
 * `input[type="checkbox"]` or `input[type="radio"]`, labelled by the main content. The `expandIcon` slot
 * has no default content.
 */
export const TreeItemLayout: ForwardRefComponent<TreeItemLayoutProps> = /*#__PURE__*/ composeComponent(
  'TreeItemLayout',
  useTreeItemLayout,
  renderTreeItemLayout,
);
