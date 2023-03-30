import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import story from './TreeAppearance.md';

export const Appearance = () => {
  return (
    <>
      <Tree aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Subtle tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
      <Tree appearance="subtle-alpha" aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Subtle-alpha tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
      <Tree appearance="transparent" aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Transparent tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
