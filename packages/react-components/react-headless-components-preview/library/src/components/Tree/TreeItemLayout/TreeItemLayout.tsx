'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemLayoutProps } from './TreeItemLayout.types';
import { useTreeItemLayout } from './useTreeItemLayout';
import { renderTreeItemLayout } from './renderTreeItemLayout';

export const TreeItemLayout: ForwardRefComponent<TreeItemLayoutProps> = React.forwardRef((props, ref) => {
  return renderTreeItemLayout(useTreeItemLayout(props, ref));
});
TreeItemLayout.displayName = 'TreeItemLayout';
