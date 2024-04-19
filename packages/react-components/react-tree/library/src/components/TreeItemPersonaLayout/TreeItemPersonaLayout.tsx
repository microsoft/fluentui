import * as React from 'react';
import { useTreeItemPersonaLayout_unstable } from './useTreeItemPersonaLayout';
import { renderTreeItemPersonaLayout_unstable } from './renderTreeItemPersonaLayout';
import { useTreeItemPersonaLayoutStyles_unstable } from './useTreeItemPersonaLayoutStyles.styles';
import type { TreeItemPersonaLayoutProps } from './TreeItemPersonaLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTreeItemPersonaLayoutContextValues_unstable } from './useTreeItemPersonaLayoutContextValues';

/**
 * The `TreeItemPersonaLayout` component is used as a child of `TreeItem` to display a `TreeItem` with a media (typically an avatar) and a description.
 * It provides a more visually appealing representation of a `TreeItem` and is typically used to display a list of people or topics.
 * This component should only be used as a direct child of `TreeItem`.
 */
export const TreeItemPersonaLayout: ForwardRefComponent<TreeItemPersonaLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemPersonaLayout_unstable(props, ref);

  useTreeItemPersonaLayoutStyles_unstable(state);

  const contextValues = useTreeItemPersonaLayoutContextValues_unstable(state);

  return renderTreeItemPersonaLayout_unstable(state, contextValues);
});

TreeItemPersonaLayout.displayName = 'TreeItemPersonaLayout';
