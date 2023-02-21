import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { LockClosed20Regular } from '@fluentui/react-icons';

export const IconAfter = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem>
        <TreeItemLayout iconAfter={<LockClosed20Regular />}>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem>
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem>
        <TreeItemLayout iconAfter={<LockClosed20Regular />}>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem>
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem>
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
