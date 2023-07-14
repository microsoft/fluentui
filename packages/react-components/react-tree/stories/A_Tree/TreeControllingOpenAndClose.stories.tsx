import * as React from 'react';
import {
  Tree,
  TreeItemValue,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-tree';
import story from './TreeControllingOpenAndClose.md';

export const OpenItemsControlled = () => {
  const [openItems, setOpenItems] = React.useState<TreeItemValue[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr => (data.open ? [...curr, data.value] : curr.filter(value => value !== data.value)));
  };
  return (
    <Tree aria-label="Tree" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem itemType="branch" value="tree-item-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

OpenItemsControlled.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
