'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemPersonaLayoutProps } from './TreeItemPersonaLayout.types';
import { useTreeItemPersonaLayout, useTreeItemPersonaLayoutContextValues } from './useTreeItemPersonaLayout';
import { renderTreeItemPersonaLayout } from './renderTreeItemPersonaLayout';

export const TreeItemPersonaLayout: ForwardRefComponent<TreeItemPersonaLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemPersonaLayout(props, ref);
  const contextValues = useTreeItemPersonaLayoutContextValues(state);
  return renderTreeItemPersonaLayout(state, contextValues);
});
TreeItemPersonaLayout.displayName = 'TreeItemPersonaLayout';
