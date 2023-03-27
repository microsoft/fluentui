import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { TreeOpenChangeData, TreeOpenChangeEvent } from '../../src/components/Tree/Tree.types';
import story from './TreeItemExpandCollapseIconOnly.md';

export const ExpandCollapseIconOnly = () => {
  const onOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.type === 'Click' || data.type === 'Enter') {
      event.preventDefault();
      // TODO: We might need to add the ID of the treeeItem to the event
      alert('click on item');
    }
  };

  return (
    <Tree aria-label="Tree" onOpenChange={onOpenChange}>
      <TreeItem id="default-subtree-1">
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
      <TreeItem id="default-subtree-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem id="default-subtree-2-1">
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

ExpandCollapseIconOnly.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
