import * as React from 'react';
import { useTreeItemPersonaLayout_unstable } from './useTreeItemPersonaLayout';
import { renderTreeItemPersonaLayout_unstable } from './renderTreeItemPersonaLayout';
import { useTreeItemPersonaLayoutStyles_unstable } from './useTreeItemPersonaLayoutStyles';
import type { TreeItemPersonaLayoutProps } from './TreeItemPersonaLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTreeItemPersonaLayoutContextValues_unstable } from './useTreeItemPersonaLayoutContextValues';

/**
 * TreeItemPersonaLayout component - TODO: add more docs
 */
export const TreeItemPersonaLayout: ForwardRefComponent<TreeItemPersonaLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemPersonaLayout_unstable(props, ref);

  useTreeItemPersonaLayoutStyles_unstable(state);

  const contextValues = useTreeItemPersonaLayoutContextValues_unstable(state);

  return renderTreeItemPersonaLayout_unstable(state, contextValues);
});

TreeItemPersonaLayout.displayName = 'TreeItemPersonaLayout';
