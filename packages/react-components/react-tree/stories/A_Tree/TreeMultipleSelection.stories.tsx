import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { Image20Regular } from '@fluentui/react-icons';

export const MultipleSelection = () => {
  return (
    <Tree defaultOpenItems={['1', '2', '2-1']} selectionMode="multiselect" aria-label="Tree">
      <TreeItem value="1" itemType="branch">
        <TreeItemLayout iconBefore={<Image20Regular />}>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem value="1-1" itemType="leaf">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem value="1-2" itemType="leaf">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem value="1-3" itemType="leaf">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem value="2" itemType="branch">
        <TreeItemLayout iconBefore={<Image20Regular />}>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem value="2-1" itemType="branch">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem value="2-1-1" itemType="leaf">
                <TreeItemLayout iconBefore={<Image20Regular />}>level 3, item 1</TreeItemLayout>
              </TreeItem>
              <TreeItem value="2-1-2" itemType="leaf">
                <TreeItemLayout iconBefore={<Image20Regular />}>level 3, item 2</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem value="2-2" itemType="leaf">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 2</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem value="3" itemType="leaf">
        <TreeItemLayout iconBefore={<Image20Regular />}>level 1, item 3</TreeItemLayout>
      </TreeItem>
    </Tree>
  );
};
