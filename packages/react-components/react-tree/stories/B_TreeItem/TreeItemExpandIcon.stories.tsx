import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeItemValue } from '@fluentui/react-tree';
import { Add12Regular, Subtract12Regular } from '@fluentui/react-icons';
import { TreeOpenChangeData, TreeOpenChangeEvent } from '../../src/Tree';
import story from './TreeItemExpandIcon.md';

export const ExpandIcon = () => {
  const [openItems, setOpenItems] = React.useState<TreeItemValue[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr => (data.open ? [...curr, data.value] : curr.filter(value => value !== data.value)));
  };
  return (
    <Tree aria-label="Tree" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem
        expandIcon={openItems.includes('tree-item-1') ? <Add12Regular /> : <Subtract12Regular />}
        itemType="branch"
        value="tree-item-1"
      >
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
      <TreeItem
        expandIcon={openItems.includes('tree-item-2') ? <Add12Regular /> : <Subtract12Regular />}
        itemType="branch"
        value="tree-item-2"
      >
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem
            expandIcon={openItems.includes('tree-item-3') ? <Add12Regular /> : <Subtract12Regular />}
            itemType="branch"
            value="tree-item-3"
          >
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

ExpandIcon.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
