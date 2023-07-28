import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';

export const MultiSelection = () => (
  <Tree selectionMode="multiselect" aria-label="Tree">
    <TreeItem itemType="branch" value="1">
      <TreeItemLayout>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem value="1-1" itemType="leaf">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem value="1-2" itemType="leaf">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem value="1-3" itemType="leaf">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" value="2">
      <TreeItemLayout>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch" value="2-1">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem value="2-1-1" itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem value="2-1-2" itemType="leaf">
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem value="2-1-3" itemType="leaf">
              <TreeItemLayout>level 3, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="branch" value="2-2">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
          <Tree>
            <TreeItem value="2-2-1" itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem value="2-2-2" itemType="leaf">
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem value="2-2-3" itemType="leaf">
              <TreeItemLayout>level 3, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);
