import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';

export const ExpandCollapseIconOnly = () => {
  const onClick = () => alert('click');

  return (
    <Tree aria-label="Tree">
      <TreeItem onClick={onClick}>
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
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
      <TreeItem onClick={onClick}>
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem onClick={onClick}>
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
