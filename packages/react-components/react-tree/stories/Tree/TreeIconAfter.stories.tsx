import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { LockClosed20Regular } from '@fluentui/react-icons';

export const IconAfter = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem aria-owns="default-subtree-1">
        <TreeItemLayout iconAfter={<LockClosed20Regular />}>level 1, item 1</TreeItemLayout>
      </TreeItem>
      <Tree id="default-subtree-1">
        <TreeItem>level 2, item 1</TreeItem>
        <TreeItem>level 2, item 2</TreeItem>
        <TreeItem>level 2, item 3</TreeItem>
      </Tree>
      <TreeItem aria-owns="default-subtree-2">
        <TreeItemLayout iconAfter={<LockClosed20Regular />}>level 1, item 2</TreeItemLayout>
      </TreeItem>
      <Tree id="default-subtree-2">
        <TreeItem aria-owns="default-subtree-2-1">level 2, item 1</TreeItem>
        <Tree id="default-subtree-2-1">
          <TreeItem>level 3, item 1</TreeItem>
        </Tree>
      </Tree>
    </Tree>
  );
};
